"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Github, Linkedin, Mail, MapPin, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { toggleCopy } from "@/utils/toggleCopy/toggleCopy";
import { toast } from "sonner";
import { useState } from "react";
import clsx from "clsx";

export default function Home() {
  const [isAvailable] = useState(false); // cambiar estado para cambiar la disponibilidad
  const [openPhoto, setOpenPhoto] = useState(false);

  const proyects = [
    {
      id: 1,
      title: "Portfolio Personal",
      description:
        "Portfolio personal desarrollado con Next.js, TailwindCSS y Framer Motion",
      image: "/assets/photos/placeholderImage.svg",
      url: "https://nicolasschonfeld.com",
    },
    {
      id: 2,
      title: "Nutrixya",
      description:
        "Sistema de gestión nutricional desarrollado con React, Node.js y MongoDB",
      image: "/assets/photos/placeholderImage.svg",
      url: "https://nutrixya.com",
    },
    {
      id: 3,
      title: "25Watts",
      description:
        "Agencia digital especializada en desarrollo web y marketing digital",
      image: "/assets/photos/placeholderImage.svg",
      url: "https://25watts.com.ar",
    },
  ];

  return (
    <>
      <main className="flex items-start justify-center min-h-screen bg-gray-50">
        <div className="container max-w-5xl flex flex-col items-start justify-center h-full p-5 lg:p-10 gap-10 border-r border-l border-dashed bg-[#fcfcfb]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-20 cursor-pointer"
          >
            <Avatar className="w-20 h-20" onClick={() => setOpenPhoto(true)}>
              <AvatarImage
                src="/assets/avatars/avatar-01.png"
                alt="@nicoshconfeld_"
                width={100}
                height={100}
              />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                D
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                e
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                s
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                a
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                r
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                r
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                o
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                l
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                a
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                d
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                o
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                r
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                {" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                F
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                u
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                l
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                l
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                s
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
              >
                t
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                a
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05 }}
              >
                c
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                k
              </motion.span>
            </h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl font-medium mt-2"
            >
              Nico Schönfeld
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-4 text-gray-600 max-w-2xl"
            >
              Soy un Desarrollador Full-Stack con una pasión especial por el
              Front-End. Mi creatividad y deseo constante de innovar me permiten
              llevar cada proyecto al siguiente nivel. Disfruto resolviendo
              problemas complejos y creando experiencias de usuario intuitivas y
              visualmente atractivas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 mt-4"
            >
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">23 años</p>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-600">
                  Cruz del Eje, Córdoba, Argentina
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-5 flex flex-col gap-2"
            >
              <div
                onClick={() => {
                  if (toggleCopy("nicoschonfeld88@gmail.com").success) {
                    toast.success("Email copiado");
                  } else {
                    toast.error("No se pudo copiar el email");
                  }
                }}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm cursor-pointer"
              >
                <Mail className="w-4 h-4" /> nicoschonfeld88@gmail.com
              </div>

              <Link
                href="https://github.com/Nico-Schonfeld"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm cursor-pointer"
              >
                <Github className="w-4 h-4" /> @Nico-Schonfeld
              </Link>

              <Link
                href="https://www.linkedin.com/in/nicoschonfeld/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm cursor-pointer"
              >
                <Linkedin className="w-4 h-4" /> @nicoschonfeld
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-5 flex flex-row gap-3"
          >
            <Link
              href={isAvailable ? "/contact" : "/"}
              className={clsx(
                "flex px-4 items-center justify-center rounded-full border font-medium transition-all focus:outline-none",
                isAvailable
                  ? [
                      "animate-background-shine border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-gray-400 hover:text-white hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50",
                    ]
                  : [
                      "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed",
                    ]
              )}
            >
              Enviar un email <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Button className="animate-background-shine cursor-default items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-100 font-medium text-gray-500 focus:outline-none">
              <div
                className={`w-2 h-2 ${
                  isAvailable ? "bg-green-500" : "bg-red-500"
                } rounded-full`}
              ></div>
              {isAvailable ? "Disponible" : "No disponible"}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="w-full border-b border-dashed border-gray-200 my-10"
          ></motion.div>

          <motion.div
            className="w-full mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h2 className="text-xl font-medium mb-5">
              Experiencia profesional
            </h2>
            <div className="w-full p-5 lg:p-10 rounded-xl bg-[#f7f6f6]">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Link
                    href="https://25watts.com.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600 transition-colors font-medium hover:underline hover:decoration-solid"
                  >
                    25Watts
                  </Link>
                  <span className="text-sm text-gray-500">
                    nov. 2023 - actualidad
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href="https://nutrixya.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-600 transition-colors font-medium hover:underline hover:decoration-solid"
                  >
                    Nutrixya
                  </Link>
                  <span className="text-sm text-gray-500">
                    mar. 2022 - oct. 2023
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="w-full border-b border-dashed border-gray-200 my-10"
          ></motion.div>

          <motion.div
            className="w-full mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h2 className="text-xl font-medium mb-5">
              Proyectos personales y colaboraciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {proyects.map((project) => (
                <div key={project.id} className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover aspect-auto rounded-lg"
                    width="100%"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-start justify-end p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-start mb-4">
                      {project.description}
                    </p>
                    {/*  <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Ver proyecto
                    </Link> */}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {openPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setOpenPhoto(false)}
            className="w-full h-screen fixed z-20 top-0 left-0 bg-black/80  backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              className="w-52 h-52"
            >
              <Avatar className="w-52 h-52">
                <AvatarImage
                  src="/assets/avatars/avatar-01.png"
                  alt="@nicoshconfeld_"
                  width={100}
                  height={100}
                />
                <AvatarFallback>NS</AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
