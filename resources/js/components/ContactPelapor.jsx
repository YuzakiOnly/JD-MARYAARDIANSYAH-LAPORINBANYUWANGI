import { Phone } from "lucide-react";

const ContactPelapor = ({ no_telpon }) => {
    if (!no_telpon) return null;

    const masked = no_telpon.replace(
        /(\d{4})\d{3,}(\d{3})/,
        "$1•••$2"
    );

    const waLink = `https://wa.me/${no_telpon.replace(/^0/, "62")}`;

    return (
        <div className="flex items-start gap-3">
            <Phone size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
                <p className="font-medium text-slate-800 mb-1">Kontak Pelapor</p>
                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 text-sm hover:text-green-600"
                >
                    {masked}
                </a>
            </div>
        </div>
    );
};

export default ContactPelapor;