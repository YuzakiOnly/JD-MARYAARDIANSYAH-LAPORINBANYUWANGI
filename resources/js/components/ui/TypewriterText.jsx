import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypewriterText = ({
    text,
    speed = 50,   
    deleteSpeed = 30,
    delay = 2500,
    cursor = true
}) => {
    const [display, setDisplay] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;

        if (!isDeleting && index < text.length) {

            timeout = setTimeout(() => {
                setDisplay((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, speed);
        } else if (!isDeleting && index === text.length) {
            
            timeout = setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && index > 0) {

            timeout = setTimeout(() => {
                setDisplay((prev) => prev.slice(0, -1));
                setIndex((prev) => prev - 1);
            }, deleteSpeed);
        } else if (isDeleting && index === 0) {
            
            setIsDeleting(false);
        }

        return () => clearTimeout(timeout);
    }, [index, isDeleting, text, speed, deleteSpeed, delay]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block">
            {display}
            {cursor && <span className="animate-pulse text-blue-600">|</span>}
        </motion.span>
    );
};

export default TypewriterText;