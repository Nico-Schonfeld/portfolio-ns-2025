"use client";

import { parseCurrency } from "@/utils/formaterPrice/formaterPrice";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import confetti from "canvas-confetti";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label as UILabel } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MonthlySavings {
  [key: string]: number;
}

interface YearlySavings {
  [year: string]: number;
}

interface SavingsGoal {
  name: string;
  amount: number;
  imageUrl?: string;
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const SavingsTracker = () => {
  const [monthlySavings, setMonthlySavings] = useState<MonthlySavings>({});
  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal>({
    name: "",
    amount: 0,
    imageUrl: "",
  });
  const [hasStoragePermission, setHasStoragePermission] = useState<
    boolean | null
  >(null);
  const [historicalSavings, setHistoricalSavings] = useState<YearlySavings>({});
  const [showInitialSetup, setShowInitialSetup] = useState(false);
  const currentYear = new Date().getFullYear();

  const router = useRouter();

  useEffect(() => {
    const storagePermission = localStorage.getItem("storagePermission");

    if (storagePermission === null) {
      setHasStoragePermission(null);
    } else {
      setHasStoragePermission(JSON.parse(storagePermission));
      if (JSON.parse(storagePermission)) {
        loadSavedData();
      }
    }
  }, []);

  useEffect(() => {
    // Verificar si se completaron los 12 meses
    const monthsWithSavings = Object.keys(monthlySavings).length;
    if (monthsWithSavings === 12) {
      const totalSaved = calculateTotal();
      const prevYear = (currentYear - 1).toString();

      // Guardar el total en el histórico
      const newHistorical = {
        ...historicalSavings,
        [prevYear]: totalSaved,
      };
      setHistoricalSavings(newHistorical);
      localStorage.setItem("historicalSavings", JSON.stringify(newHistorical));

      // Reiniciar los ahorros mensuales
      setMonthlySavings({});
      localStorage.setItem("monthlySavings", JSON.stringify({}));

      toast.success(
        `¡Año ${prevYear} completado! El total de ${parseCurrency(
          totalSaved
        )} ha sido guardado en el histórico.`
      );
    }

    // Verificar si se alcanzó el objetivo
    const hasReachedGoal =
      savingsGoal.amount > 0 && calculateTotal() >= savingsGoal.amount;
    if (hasReachedGoal && !showInitialSetup && hasStoragePermission === true) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      toast.success("¡Felicitaciones! Has alcanzado tu objetivo de ahorro! 🎉");
    }
  }, [
    monthlySavings,
    savingsGoal.amount,
    showInitialSetup,
    hasStoragePermission,
  ]);

  const loadSavedData = () => {
    const savedData = localStorage.getItem("monthlySavings");
    const savedGoal = localStorage.getItem("savingsGoal");
    const savedHistorical = localStorage.getItem("historicalSavings");

    if (savedData) {
      setMonthlySavings(JSON.parse(savedData));
    }
    if (savedGoal) {
      setSavingsGoal(JSON.parse(savedGoal));
    } else {
      setShowInitialSetup(true);
    }
    if (savedHistorical) {
      setHistoricalSavings(JSON.parse(savedHistorical));
    }
  };

  const handleStoragePermission = (allow: boolean) => {
    setHasStoragePermission(allow);
    localStorage.setItem("storagePermission", JSON.stringify(allow));
    if (allow) {
      setShowInitialSetup(true);
      loadSavedData();
    } else {
      router.push("/");
    }
  };

  const handleInitialSetup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("savingsGoal", JSON.stringify(savingsGoal));
    setShowInitialSetup(false);
  };

  const handleReset = () => {
    if (
      confirm(
        "¿Estás seguro de que deseas reiniciar todo? Esta acción no se puede deshacer."
      )
    ) {
      localStorage.clear();
      setMonthlySavings({});
      setSavingsGoal({ name: "", amount: 0, imageUrl: "" });
      setHistoricalSavings({});
      setHasStoragePermission(null);
      setShowInitialSetup(false);
      toast.success("Todos los datos han sido reiniciados");
    }
  };

  const calculateTotal = () => {
    return Object.values(monthlySavings).reduce(
      (sum, amount) => sum + amount,
      0
    );
  };

  const handleSaveAmount = (month: string, amount: number) => {
    if (!hasStoragePermission) return;

    const newSavings = {
      ...monthlySavings,
      [month]: amount,
    };

    setMonthlySavings(newSavings);
    localStorage.setItem("monthlySavings", JSON.stringify(newSavings));
  };

  const handleUpdateGoal = (newGoal: string) => {
    if (!hasStoragePermission) return;

    const cleanValue = newGoal.replace(/^0+/, "") || "0";
    const numericValue = Number(cleanValue);
    setSavingsGoal({ ...savingsGoal, amount: numericValue });
    localStorage.setItem(
      "savingsGoal",
      JSON.stringify({ ...savingsGoal, amount: numericValue })
    );
  };

  const totalSaved = calculateTotal();
  const remaining = savingsGoal.amount - totalSaved;

  const chartData = [
    { name: "Total Ahorrado", value: totalSaved, fill: "#60A5FA" },
    { name: "Faltante", value: remaining, fill: "#FCD34D" },
  ];

  const chartConfig = {
    totalSaved: {
      label: "Total Ahorrado",
      color: "#60A5FA",
    },
    remaining: {
      label: "Faltante",
      color: "#FCD34D",
    },
  } satisfies ChartConfig;

  if (hasStoragePermission === null || hasStoragePermission === false) {
    return (
      <main className="flex items-start justify-center h-screen bg-gray-50">
        <div className="container max-w-5xl flex flex-col items-start justify-center h-full p-5 lg:p-10 gap-10 border-r border-l border-dashed bg-[#fcfcfb]">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Seguimiento de Ahorros
            </h2>
            <div className="mb-8 text-center text-gray-600">
              <p className="mb-4">Esta herramienta te ayuda a:</p>
              <ul className="space-y-2 text-left list-disc list-inside">
                <li>Establecer metas de ahorro anuales</li>
                <li>Registrar tus ahorros mensuales</li>
                <li>Visualizar tu progreso hacia tus objetivos</li>
                <li>Mantener un histórico de tus ahorros por año</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg mb-8">
              <p className="text-yellow-800 text-sm">
                Para funcionar, necesitamos tu permiso para guardar datos en
                este dispositivo. Esto nos permite mantener un registro de tus
                ahorros y metas.
              </p>
            </div>
            <div className="flex gap-4 justify-center flex-col lg:flex-row">
              <Button
                onClick={() => handleStoragePermission(true)}
                variant="default"
              >
                Permitir y Comenzar
              </Button>
              <Button
                onClick={() => handleStoragePermission(false)}
                variant="secondary"
              >
                No permitir
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (showInitialSetup) {
    return (
      <main className="flex items-start justify-center h-screen bg-gray-50">
        <div className="container max-w-5xl flex flex-col items-start justify-center h-full p-5 lg:p-10 gap-10 border-r border-l border-dashed bg-[#fcfcfb]">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Configura tu objetivo de ahorro
            </h2>
            <form onSubmit={handleInitialSetup} className="space-y-6">
              <div>
                <UILabel htmlFor="goalName">Nombre del objetivo</UILabel>
                <Input
                  id="goalName"
                  type="text"
                  required
                  placeholder="Ej: Auto 0km"
                  value={savingsGoal.name}
                  onChange={(e) =>
                    setSavingsGoal({ ...savingsGoal, name: e.target.value })
                  }
                />
              </div>
              <div>
                <UILabel htmlFor="goalAmount">Monto objetivo (CLP)</UILabel>
                <Input
                  id="goalAmount"
                  type="number"
                  required
                  placeholder="0"
                  value={savingsGoal.amount}
                  onChange={(e) =>
                    setSavingsGoal({
                      ...savingsGoal,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <UILabel htmlFor="imageUrl">
                  URL de la imagen (opcional)
                </UILabel>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={savingsGoal.imageUrl}
                  onChange={(e) =>
                    setSavingsGoal({ ...savingsGoal, imageUrl: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Comenzar a ahorrar
              </Button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-start justify-center min-h-screen bg-gray-50">
      <div className="container max-w-5xl flex flex-col items-start justify-center h-full p-5 lg:p-10 gap-10 border-r border-l border-dashed bg-[#fcfcfb] mt-20">
        {/* Objetivo */}
        {savingsGoal.imageUrl && (
          <div className="w-full max-w-md mx-auto">
            <img
              src={savingsGoal.imageUrl}
              alt={savingsGoal.name}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Objetivo: {savingsGoal.name}
        </h2>

        {/* Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="p-4 bg-sky-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Objetivo a ahorrar</h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={savingsGoal.amount}
                onChange={(e) => handleUpdateGoal(e.target.value)}
                min="0"
                placeholder="0"
              />
              <span className="text-gray-800">CLP</span>
            </div>
          </div>
          <div className="p-4 bg-green-200 rounded-lg">
            <h3 className="font-bold text-gray-800">
              Total Ahorrado {currentYear}
            </h3>
            <span className="text-gray-800">{parseCurrency(totalSaved)}</span>
          </div>
          <div className="p-4 bg-orange-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Faltante</h3>
            <span className="text-gray-800">{parseCurrency(remaining)}</span>
          </div>
        </div>

        {/* Gráfico de Progreso */}
        <Card className="flex flex-col mb-8 bg-white w-full">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-gray-800">Progreso del Ahorro</CardTitle>
            <CardDescription className="text-gray-600">
              Meta vs. Ahorrado
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        const percentage = Math.round(
                          (totalSaved / savingsGoal.amount) * 100
                        );
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="text-gray-800 text-3xl font-bold"
                            >
                              {percentage}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="text-gray-600"
                            >
                              Completado
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Histórico de años anteriores */}
        {Object.keys(historicalSavings).length > 0 && (
          <div className="mb-8 w-full">
            <h3 className="font-bold mb-4 text-gray-800">
              Histórico de Ahorros
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(historicalSavings).map(([year, amount]) => (
                <div key={year} className="p-4 bg-purple-200 rounded-lg">
                  <h4 className="font-bold text-gray-800">Total {year}</h4>
                  <span className="text-gray-800">{parseCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabla de ahorros */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left text-gray-800">
                  {currentYear}
                </th>
                <th className="border p-3 text-left text-gray-800">Monto</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month) => (
                <tr key={month}>
                  <td className="border p-3 text-gray-800">{month}</td>
                  <td className="border p-3">
                    <Input
                      type="number"
                      value={monthlySavings[month] || ""}
                      onChange={(e) => {
                        const value = e.target.value
                          ? parseInt(e.target.value)
                          : 0;
                        handleSaveAmount(month, value);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón de reinicio */}
        <Button variant="destructive" onClick={handleReset} className="mt-8">
          Reiniciar todo
        </Button>
      </div>
    </main>
  );
};

export default SavingsTracker;
