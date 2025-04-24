import shree from "../assets/shree.jpg";
import wazid from "../assets/wazid.jpg";
import sid from "../assets/sid.jpg";
import sudeep from "../assets/sudeep.jpg";

export default function About() {
  const team = [
    {
      name: "Shreyash Chavan",
      role: "Frontend and Design",
      photo: shree,
    },
    {
      name: "Siddarath Mamadapur",
      role: "Frontend & Content Strategist",
      photo: sid,
    },
    {
      name: "Sudeep Pattanshetti",
      role: "UI/UX Designer",
      photo: sudeep,
    },
    {
      name: "Wazid Munavalli",
      role: "Backend Developer & Content Strategist",
      photo: wazid,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EA] pt-24 pb-28 px-6 font-[Outfit] text-gray-800">
      {/* Intro */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-bold mb-4">About PhiloMind</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A space for emotional reflection and thoughtful awareness. We combine
          philosophy and psychology to help people explore their inner worlds,
          mindfully.
        </p>
      </div>

      {/* Philosophy & Mission */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-24">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[#2B2B2B]">
            Our Philosophy
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            PhiloMind was built on the belief that self-awareness is not just
            emotional but also philosophical. We invite users to slow down,
            observe, and articulate what they feel with clarity and depth.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[#2B2B2B]">
            Our Mission
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            To offer a clean, thoughtful space where users can reflect, grow,
            and gain perspective. We believe in design that supports
            introspection — gentle, intuitive, and calming.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-3xl font-semibold mb-10">Meet the Team</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-[#f0ece4] shadow-md"
              />
              <div className="text-xl font-medium text-[#2B2B2B]">
                {member.name}
              </div>
              <div className="text-sm text-gray-600">{member.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto text-center bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-base text-gray-600 mb-6">
          We'd love to hear from you — whether it’s feedback, collaboration, or
          questions about PhiloMind.
        </p>
        <div className="space-y-3 text-gray-700 text-lg">
          <p>
            📧 <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:philomind.contact@gmail.com"
              className="text-blue-600 underline"
            >
              philomind.contact@gmail.com
            </a>
          </p>
          <p>
            📞 <span className="font-medium">Phone:</span>{" "}
            <a href="tel:+919123456789" className="text-blue-600 underline">
              +91 91234 56789
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
