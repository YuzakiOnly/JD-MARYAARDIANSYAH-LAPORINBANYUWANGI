// TestimonialSection.jsx  (hanya data id 1, 2, 3)
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export const TestimonialSection = ({ testimonials = [] }) => {
    /* filter hanya id 1, 2, 3 */
    const filtered = testimonials.filter(t => [1, 2, 3].includes(t.id));

    const container = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };
    const item = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    if (!filtered.length) return null;

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-40 text-center">
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-10"
            >
                Apa Kata Mereka?
            </motion.h2>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 md:grid-cols-3"
            >
                {filtered.map((t) => (
                    <motion.div key={t.id} variants={item}>
                        <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <Quote className="w-8 h-8 text-blue-500 mb-3" />
                                <p className="text-slate-600 mb-4 italic line-clamp-4">"{t.feedback}"</p>
                                <Avatar className="w-14 h-14 mb-2">
                                    <AvatarImage src={t.image} alt={t.name} />
                                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-semibold">{t.name}</h3>
                                <p className="text-sm text-slate-500">{t.role}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};