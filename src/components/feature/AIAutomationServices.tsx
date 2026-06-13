import { useState } from "react";

export default function AIAutomationServices() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch(
        "https://readdy.ai/api/form/d49d77h7bl57tkq9h3pg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: formData.name,
            email: formData.email,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus("Thank you! We will contact you soon.");
        setFormData({ name: "", email: "" });
      } else {
        setSubmitStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [selectedConcept, setSelectedConcept] = useState("Automation");

  return (
    <section className="bg-[#f7f5ef] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
          {/* Left Column - Light Background */}
          <div className="bg-gray-100 rounded-3xl lg:rounded-l-3xl lg:rounded-r-none sm:p-8 lg:p-12 flex flex-col justify-between reveal-fade-up">
            <div>
              <h2
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <span className="text-gray-400">How</span>{" "}
                <span className="text-[#1F2853]">AI Automation</span> is
                reshaping business solutions
              </h2>

              <p
                className="text-lg text-gray-700 mb-8 leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                From advanced automation to cutting-edge AI, intelligent
                automation is driving a new era of efficiency, reliability, and
                scalability.
              </p>

              {/* Pill-shaped Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium shadow-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Performance
                </span>
                <span
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium shadow-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Efficiency
                </span>
                <span
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium shadow-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Scalability
                </span>
                <span
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full text-sm font-medium shadow-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Integration
                </span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                data-readdy-form
                id="ai-automation-consultation"
                className="space-y-4"
              >
                <div className="flex flex-wrap gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1F2853] focus:border-transparent text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1F2853] focus:border-transparent text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1F2853] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#162040] transition-all duration-300 whitespace-nowrap cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 group"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <div className="w-5 h-5 bg-[#f25a1a] rounded-full flex items-center justify-center group-hover:translate-x-[15rem] group-hover:opacity-0 transition-all duration-1000">
                    <i className="ri-play-fill text-white text-xs"></i>
                  </div>
                  {isSubmitting ? "Submitting..." : "Start Automation"}
                </button>

                {submitStatus && (
                  <div
                    className={`p-3 rounded-lg text-sm ${submitStatus.includes("Thank you")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {submitStatus}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Column - Dark Background */}
          <div className="bg-gradient-to-br from-[#1F2853] to-[#0a0f20] rounded-3xl lg:rounded-r-3xl lg:rounded-l-none p-8 lg:p-12 relative overflow-hidden mt-6 lg:mt-0">
            {/* Abstract geometric pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(242, 90, 26, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(242, 90, 26, 0.3) 0%, transparent 50%),
                  linear-gradient(135deg, transparent 0%, rgba(242, 90, 26, 0.1) 100%)
                `,
              }}
            ></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3
                  className="text-3xl lg:text-4xl font-bold text-white mb-6"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  The Future Forged in Precision.
                </h3>

                <p
                  className="text-lg text-white/80 mb-10 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  By merging AI technology with innovation, businesses are
                  unlocking smarter solutions that reduce costs, enhance
                  performance, and shape the future of automation.
                </p>

                {/* Circular Concept Elements */}
                <div className="relative mb-10">
                  {/* Interconnected lines */}
                  <svg
                    className="sm:block hidden absolute inset-0 w-full h-32 opacity-30"
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 50 50 Q 100 30, 150 50 T 250 50 T 350 50"
                      stroke="rgba(242, 90, 26, 0.5)"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  <div className="grid grid-cols-2 gap-4 sm:gap-0 sm:flex justify-between items-center relative z-10">
                    {["Automation", "Efficiency", "Data", "Innovation"].map(
                      (concept) => (
                        <button
                          key={concept}
                          onMouseOver={() => setSelectedConcept(concept)}
                          className={`relative group flex flex-col items-center gap-2 transition-all duration-300 ${selectedConcept === concept
                              ? "scale-110"
                              : "scale-100"
                            }`}
                        >
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${selectedConcept === concept
                                ? "bg-[#f25a1a] text-white shadow-lg shadow-[#f25a1a]/50 border-2 border-[#f25a1a]"
                                : "bg-white/10 text-white/60 border-2 border-white/20 hover:border-white/40"
                              }`}
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {concept.charAt(0)}
                          </div>
                          <span
                            className={`text-xs font-medium transition-colors ${selectedConcept === concept
                                ? "text-[#f25a1a]"
                                : "text-white/60"
                              }`}
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {concept}
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
