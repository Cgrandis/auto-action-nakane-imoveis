'use client';

import Header from '@/app/componentes/Header';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ExamplesTabs from '@/app/componentes/usageexamples/UsageTabs';
import { useEffect, useState } from 'react';

const images = [
  {
    src: "/images/whatsapp_ia.png",
    alt: "Automação 1",
  },
  {
    src: "/images/Leonardo_Lightning_XL_dynamic_abstract_flow_of_data_with_arrow_0.jpg",
    alt: "Automação 2",
  },
  {
    src: "/images/Leonardo_Lightning_XL_um_desenho_de_dois_graficos_e_dois_eleme_0.jpg",
    alt: "Automação 3",
  },
];

export default function Home() {
  const [refText, inViewText] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 10000); // 10 segundos

  return () => clearInterval(interval);
}, []);

  return (
    <>
      <Header />
      <section className="bg-[#344459] text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between md:gap-12">
          {/* Coluna da Esquerda com animação de entrada pela esquerda */}
          <motion.div
            ref={refText}
            initial={{ opacity: 0, x: -80 }}
            animate={inViewText ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#05AFF2]">
              Desbloqueie a Eficiência Máxima com Aplicações Sob Medida e Inteligência Artificial.
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Desenvolvimento de aplicações web e mobile personalizadas, integrando automação de tarefas e inteligência artificial para otimizar seus processos e impulsionar seus resultados.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <Link
                href="/contato"
                className="bg-[#05DBF2] hover:bg-[#0583F2] text-[#0D0D0D] font-semibold px-8 py-3 rounded-md transition-colors"
              >
                Solicite um Orçamento Gratuito
              </Link>
            </div>
          </motion.div>

          {/* Coluna da Direita com uma imagem por vez em full, rotacionando */}
          <div className="md:w-1/2 h-[600px] relative rounded-md overflow-hidden">
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resto do seu conteúdo abaixo da Hero Section */}
      <ExamplesTabs />

    </>
  );
}
