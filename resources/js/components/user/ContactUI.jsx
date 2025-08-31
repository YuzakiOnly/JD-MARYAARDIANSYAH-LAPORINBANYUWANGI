import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import { contactValidator } from "@/lib/contactValidation";

export function ContactUI({ kecamatans = [], auth }) {
    const { data, setData, post, processing, reset } = useForm({
        nama_lengkap: "",
        kecamatan_id: "",
        no_telpon: "",
        alamat_email: "",
        deskripsi: "",
    });

    const [localErrors, setLocalErrors] = useState({});

    const handleChange = (key, value) => {
        setData(key, value);
        setLocalErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const submit = (e) => {
        e.preventDefault();

        if (!auth?.user) {
            router.visit("/login");
            return;
        }
        
        const errs = contactValidator(data);
        if (Object.keys(errs).length) {
            setLocalErrors(errs);
            return;
        }
        setLocalErrors({});

        Swal.fire({
            title: "Apakah yakin?",
            text: "Pesan akan dikirim ke tim Laporin.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                post("/contact", {
                    onSuccess: () => {
                        reset();
                        Swal.fire({
                            title: "Terkirim!",
                            text: "Pesan Anda berhasil dikirim.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    };

    return (
        <form
            onSubmit={submit}
            className="w-full rounded-xl border shadow-sm overflow-hidden"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                <div className="flex flex-col justify-between bg-gray-50 py-10 px-8 w-full h-full">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800">Hubungi Kami</h2>
                        <p className="text-slate-600">
                            Laporkan permasalahan lingkungan di sekitar Anda. Kami siap
                            membantu 24 jam.
                        </p>

                        {/* Alamat */}
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-blue-600 p-4 flex items-center justify-center">
                                <MdLocationOn className="text-white text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Kantor Pusat</h3>
                                <p className="text-sm text-slate-600">
                                    Jalan Ahmad Yani <br /> Banyuwangi - Indonesia
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-blue-600 p-4 flex items-center justify-center">
                                <MdEmail className="text-white text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Email Kami</h3>
                                <p className="text-sm text-slate-600">
                                    support@laporin.id <br /> hello@laporin.id
                                </p>
                            </div>
                        </div>

                        {/* Telepon */}
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-blue-600 p-4 flex items-center justify-center">
                                <MdPhone className="text-white text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Telepon Kami</h3>
                                <p className="text-sm text-slate-600">
                                    Telp: +62 812-3456-7890 <br /> Fax: +62 21-2002-2013
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                        <h3 className="font-semibold text-xl text-slate-700">
                            Ikuti Media Sosial Kami
                        </h3>
                        <div className="flex gap-6 pt-4 text-2xl text-blue-600">
                            <FaFacebook className="cursor-pointer hover:text-blue-800 size-8" />
                            <FaInstagram className="cursor-pointer hover:text-pink-600 size-8" />
                            <FaTwitter className="cursor-pointer size-8 hover:text-sky-500" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between bg-white py-10 px-8 w-full h-full">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-800">Kirim Pesan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Input
                                    placeholder="Nama Lengkap"
                                    value={data.nama_lengkap}
                                    onChange={(e) =>
                                        handleChange("nama_lengkap", e.target.value)
                                    }
                                />
                                {localErrors.nama_lengkap && (
                                    <p className="text-red-500 text-sm">
                                        {localErrors.nama_lengkap}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Select
                                    value={data.kecamatan_id}
                                    onValueChange={(value) =>
                                        handleChange("kecamatan_id", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Kecamatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kecamatans.length ? (
                                            kecamatans.map((kec) => (
                                                <SelectItem
                                                    key={kec.id}
                                                    value={kec.id.toString()}
                                                >
                                                    {kec.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem disabled>
                                                Tidak ada data kecamatan
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {localErrors.kecamatan_id && (
                                    <p className="text-red-500 text-sm">
                                        {localErrors.kecamatan_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    placeholder="Nomor Telepon"
                                    value={data.no_telpon}
                                    onChange={(e) =>
                                        handleChange("no_telpon", e.target.value)
                                    }
                                />
                                {localErrors.no_telpon && (
                                    <p className="text-red-500 text-sm">
                                        {localErrors.no_telpon}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="email"
                                    placeholder="Alamat Email"
                                    value={data.alamat_email}
                                    onChange={(e) =>
                                        handleChange("alamat_email", e.target.value)
                                    }
                                />
                                {localErrors.alamat_email && (
                                    <p className="text-red-500 text-sm">
                                        {localErrors.alamat_email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Textarea
                            className="my-6 h-56"
                            placeholder="Tulis pesan Anda di sini..."
                            value={data.deskripsi}
                            onChange={(e) => handleChange("deskripsi", e.target.value)}
                        />
                        {localErrors.deskripsi && (
                            <p className="text-red-500 text-sm">{localErrors.deskripsi}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-6 bg-blue-600 cursor-pointer hover:bg-blue-700 text-base"
                        disabled={processing}
                    >
                        {processing ? "Mengirim..." : "Kirim Pesan"}
                    </Button>
                </div>
            </div>
        </form>
    );
}