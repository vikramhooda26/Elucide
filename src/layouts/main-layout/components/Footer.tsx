import "./style/Footer.css";

function Footer() {
    return (
        <footer className="relative overflow-hidden bg-gray-900 py-28 text-white">
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="animate-fadeIn flex flex-col items-center">
                        <h6 className="mb-4 text-2xl font-bold">Discover</h6>
                        <p className="text-center">
                            Understand brand objectives & leverage our advanced search filters find the best match for
                            your brand.
                        </p>
                    </div>
                    <div className="animate-fadeIn delay-1s flex flex-col items-center">
                        <h6 className="mb-4 text-2xl font-bold">Analyze</h6>
                        <p className="text-center">
                            Use industry insights & AI-enhanced match-making capability to analyze the ideal fit based
                            on brand objectives.
                        </p>
                    </div>
                    <div className="animate-fadeIn delay-2s flex flex-col items-center">
                        <h6 className="mb-4 text-2xl font-bold">Engage</h6>
                        <p className="text-center">
                            Facilitate & execute partnerships with the identified stakeholders to create mutually
                            beneficial associations.
                        </p>
                    </div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="my-5 w-full text-center md:w-1/3">
                        <h6 className="mb-2 font-bold">Follow Us</h6>
                        <div className="flex items-center justify-center space-x-4">
                            {/* <a href="https://sponsor-sync.com/" className="text-blue-500 animate-pulse">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.714-1.795 1.763v2.309h3.588l-.468 3.622h-3.12V24h6.116c.725 0 1.325-.6 1.325-1.324V1.325C24 .6 23.4 0 22.675 0z" />
                </svg>
              </a> */}
                            <a href="https://twitter.com" target="_blank" className="animate-pulse text-blue-500">
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M23.954 4.569c-.885.392-1.83.654-2.825.775 1.014-.608 1.794-1.57 2.163-2.723-.95.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.044.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.722-.666 1.561-.666 2.456 0 1.692.861 3.182 2.171 4.057-.799-.025-1.553-.245-2.212-.612v.062c0 2.366 1.685 4.343 3.918 4.791-.411.112-.844.171-1.292.171-.316 0-.623-.03-.921-.086.623 1.943 2.431 3.354 4.571 3.394-1.675 1.31-3.785 2.093-6.075 2.093-.395 0-.785-.023-1.17-.068 2.166 1.389 4.742 2.201 7.514 2.201 9.014 0 13.948-7.464 13.948-13.943 0-.213-.004-.425-.014-.636.959-.695 1.8-1.562 2.462-2.549z" />
                                </svg>
                            </a>
                            <a
                                href="https://instagram.com/@elucidesports"
                                target="_blank"
                                className="animate-pulse text-blue-500"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.974.975 1.245 2.242 1.307 3.608.058 1.266.07 1.646.07 4.851 0 3.205-.012 3.585-.07 4.851-.062 1.366-.333 2.633-1.307 3.608-.975.975-2.242 1.245-3.608 1.307-1.266.058-1.646.07-4.851.07-3.204 0-3.584-.012-4.85-.07-1.366-.062-2.633-.333-3.608-1.307-.975-.975-1.245-2.242-1.307-3.608-.058-1.266-.07-1.646-.07-4.851 0-3.205.012-3.585.07-4.851.062-1.366.333-2.633 1.307-3.608.975-.975 2.242-1.245 3.608-1.307 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.333.012 7.052.07 5.63.127 4.343.314 3.25 1.407 2.157 2.5 1.97 3.787 1.913 5.209c-.058 1.281-.07 1.704-.07 4.851 0 3.148.012 3.571.07 4.851.057 1.422.244 2.709 1.337 3.802.969.969 2.192 1.224 3.582 1.293 1.196.055 1.553.069 4.836.069 3.284 0 3.641-.014 4.837-.069 1.39-.069 2.613-.324 3.582-1.293 1.093-1.093 1.28-2.38 1.337-3.802.058-1.281.07-1.704.07-4.851 0-3.147-.012-3.57-.07-4.851-.057-1.422-.244-2.709-1.337-3.802-.969-.969-2.192-1.224-3.582-1.293-1.195-.058-1.552-.07-4.836-.07zm0 5.838c-3.41 0-6.174 2.764-6.174 6.174s2.764 6.174 6.174 6.174 6.174-2.764 6.174-6.174-2.764-6.174-6.174-6.174zm0 10.174c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441s.645-1.441 1.441-1.441 1.441.645 1.441 1.441-.645 1.441-1.441 1.441z" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/elucide_sports"
                                target="_blank"
                                className="animate-wiggle text-blue-500"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.738v20.523C0 23.226.792 24 1.771 24h20.451C23.208 24 24 23.226 24 22.261V1.738C24 .774 23.208 0 22.225 0zM7.125 20.452H3.56V9.213h3.565v11.239zM5.345 7.709h-.024c-1.194 0-1.964-.822-1.964-1.849 0-1.043.792-1.845 2.01-1.845 1.219 0 1.964.802 1.988 1.845 0 1.027-.77 1.849-2.01 1.849zm14.553 12.743h-3.565v-5.912c0-1.49-.534-2.506-1.871-2.506-.972 0-1.55.655-1.805 1.289-.093.226-.116.539-.116.854v6.275H9.971c.047-10.187 0-11.239 0-11.239h3.564v1.586c.473-.726 1.318-1.764 3.209-1.764 2.34 0 4.154 1.53 4.154 4.818v6.599z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="mb-5 flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2">
                            <a href="tel:+1234567890" className="animate-pulse text-blue-500" target="_blank">
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.09-.27c1.2.48 2.52.73 3.88.73a1 1 0 011 1v3.54a1 1 0 01-1 1A17.94 17.94 0 013 4.06a1 1 0 011-1h3.54a1 1 0 011 1c0 1.36.25 2.68.73 3.88a1 1 0 01-.27 1.09l-2.2 2.2z" />
                                </svg>
                            </a>{" "}
                            <span>+91-7011353855</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <a href="mailto:info@sponsor-sync.com" className="animate-pulse text-blue-500">
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM4 6h16v2.8l-8 5-8-5V6zm0 12V10.5l7.32 4.58a2 2 0 002.36 0L20 10.5V18H4z" />
                                </svg>
                            </a>{" "}
                            <span>info@elucidesports.in</span>
                        </div>
                    </div>

                    <p className="animate-pulse text-sm">
                        © {new Date().getFullYear()} Evolvus Technologies. All rights reserved.
                    </p>
                </div>
            </div>
            <div className="animate-gradient absolute inset-0 bg-gradient-to-r from-[#030712] via-[#3d6af780] to-[#030712] opacity-30"></div>
            <div className="absolute left-5 top-10 h-24 w-24 animate-bounce rounded-full bg-blue-500"></div>
            <div className="animate-spin-slow absolute right-2 top-1/2 h-16 w-16 rounded-full bg-purple-500"></div>
            <div className="animate-wiggle absolute bottom-2 left-1/4 h-20 w-20 rounded-full bg-pink-500"></div>
        </footer>
    );
}

export default Footer;
