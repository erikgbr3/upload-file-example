import * as React from "react";
import { motion } from "framer-motion";

export default function Slider ({images}) {
   
      
    return (
       <motion.div className='slider-container' align='center' >
            <motion.div 
            className='slider' 
            drag='x' 
            dragConstraints={{ right: 0, left: 0 } }
            >
                {images.map((image) => (
                    <motion.div className='item'>
                        <img 
                        key={image}
                        src={image}
                        alt={image}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        transition={{ duration: 0.5 }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

