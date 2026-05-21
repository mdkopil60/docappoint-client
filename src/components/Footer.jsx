import { FaFacebookF, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white mt-20">

            <div className="max-w-7xl mx-auto px-5 py-14">

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Logo */}
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-400">
                            DocAppoint
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Book trusted doctor appointments easily.
                        </p>
                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-5 text-2xl">

                        <a href="#">
                            <FaFacebookF />
                        </a>

                        <a href="#">
                            <FaGithub />
                        </a>

                        <a href="#">
                            <FaXTwitter />
                        </a>

                    </div>

                </div>

                <div className="border-t border-slate-700 mt-10 pt-5 text-center text-gray-400">
                    © 2026 DocAppoint. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;