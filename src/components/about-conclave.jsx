import React from "react";
import { motion } from "framer-motion"; 

export default function AboutConclave() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-10"
    >
      <div className="flex flex-col">
        <h1 className="text-white font-bold text-3xl">
          ABOUT
          CONCLAVE
        </h1>
        <div className="bg-[#F8A254] w-[200px] h-[5px] mt-1 rounded-[11px]" />
      </div>
      <div className="px-10 lg:px-16 py-5 flex flex-col mt-5">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-[#F8A254] font-bold lg:text-xl"
        >
         #BusinessAndBeyond
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-[#F8A254] font-bold lg:text-xl"
        >
         #10YearsOfInspiria

        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-white flex flex-wrap text-sm lg:text-lg mt-5"
          style={{ textWrap: "balance" }}
          
        >
          The SNIOE Business Conclave is an annual flagship event organized by Inspiria, the esteemed Business Society of Shiv Nadar University. This prestigious conclave serves as a platform for students and industry leaders to come together, exchange ideas, and explore various aspects of the business world. The conclave aims to provide an all-rounded experience that equips one with knowledge, networks, and inspiration. Whether you're a student, a budding entrepreneur, or a seasoned professional, our event offers something for everyone. We have curated this year’s conclave, keeping in mind our motto- ‘Business and Beyond’. It's not just about what you'll take away from it but also about the connections you'll build, the inspiration you'll find, and the ideas that will shape your business journey. 
This year, the celebrations are a notch bigger, better and grander as we celebrate a decade of our legacy at Inspiria. 

        </motion.p>
        
        
      </div>
    </motion.div>
  );
}
