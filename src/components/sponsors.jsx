import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Image from "next/image";
import Marquee from "react-fast-marquee";
import sponsors from '../data/sponsors'

export default function Sponsors() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-10 overflow-hidden px-10 w-full relative p-20"
    >
      <div className="flex space-x-4 w-full justify-center items-center">
        <Marquee>
          {sponsors.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={"150"}
                height={"150"}
                className="mix-blend-overlay"
              />
            </motion.div>
          ))}
        
        </Marquee>
      </div>
    </motion.div>
  );
}
