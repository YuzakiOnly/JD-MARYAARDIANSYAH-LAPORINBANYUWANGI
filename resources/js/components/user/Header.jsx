import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Megaphone, Newspaper, TrendingUp, Users, CheckCircle } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";

const Header = ({ stats = {} }) => {
  const [displayStats, setDisplayStats] = useState({
    laporan: 0,
    warga: 0,
    selesai: 0
  });

  useEffect(() => {
    setDisplayStats({
      laporan: Number(stats?.laporan ?? 0),
      warga: Number(stats?.warga ?? 0),
      selesai: Number(stats?.selesai ?? 0),
    });
  }, [stats]);

  const statsConfig = [
    {
      key: 'laporan',
      value: displayStats.laporan + "+",
      label: "Total Laporan",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      key: 'warga',
      value: displayStats.warga + "+",
      label: "Total Warga",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      key: 'selesai',
      value: displayStats.selesai + "%",
      label: "Laporan Selesai",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div id="beranda" className="flex flex-col-reverse lg:flex-row items-center justify-between py-12 lg:py-20 max-w-7xl mx-auto gap-8 lg:gap-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 w-full space-y-6 text-center lg:text-left">
        <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Website Demo Laporin! Banyuwangi
        </span>

        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight font-outfit text-slate-800">
            Laporan Masalah{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Di Sekitarmu
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 h-12 sm:h-18 max-w-md mx-auto lg:mx-0">
            <TypewriterText
              text="Laporkan kondisi lingkunganmu secara cepat dan mudah. Data akan diteruskan ke pihak terkait di wilayah Banyuwangi."
              speed={60}
              delay={1500}
              cursor={true}
            />
          </p>
        </div>

        {/* Statistik */}
        <div className="flex flex-row justify-center lg:justify-start gap-2 sm:gap-4 mt-4">
          {statsConfig.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex-1 p-2 sm:p-3 sm:px-4 cursor-pointer rounded-lg ${stat.bgColor} border ${stat.borderColor} hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {/* Value */}
                    <div className={`text-sm sm:text-base md:text-lg font-bold ${stat.color} mb-0.5 sm:mb-1`}>
                      {stat.value}
                    </div>
                    {/* Label */}
                    <div className="text-[10px] sm:text-xs text-slate-600 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                  <IconComponent className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color} opacity-60`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4"
        >
          <Link
            href="/laporin"
            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
              text-white font-medium rounded-lg px-3 py-2 sm:px-5 sm:py-3 transition-all duration-300 
                flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                text-xs sm:text-sm md:text-base"
          >
            <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />
            Laporkan Sekarang
          </Link>
          <Link
            href="/berita-laporan"
            className="flex-1 sm:flex-none border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white 
                font-medium rounded-lg px-3 py-2 sm:px-5 sm:py-3 transition-all duration-300 
                flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base 
                group transform hover:-translate-y-1"
          >
            <Newspaper className="h-4 w-4 sm:h-5 sm:w-5" />
            Lihat Semua Berita
          </Link>
        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center lg:justify-end"
      >
        <div className="relative group">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src="/assets/header.png"
            alt="Ilustrasi warga melaporkan masalah lingkungan"
            className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[400px] lg:max-w-[480px] h-auto drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300"
          />
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-200 rounded-full opacity-60 animate-pulse delay-1000"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;