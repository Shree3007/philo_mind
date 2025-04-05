export default function About() {
  const team = [
    {
      name: "Shreyash Chavan",
      role: "Frontend and design",
      photo: "https://via.placeholder.com/150?text=Nishanth",
    },
    {
      name: "Siddarath Mamadapur",
      role: "Frontend  & Content Strategist",
      photo: "https://via.placeholder.com/150?text=Naveen",
    },
    {
      name: "Sudeep Pattanshetti",
      role: "UI/UX Designer ",
      photo: "https://via.placeholder.com/150?text=Sahitya",
    },
    {
      name: "Wazid Munavalli",
      role: "Backend Developer & Content Strategist",
      photo: "https://via.placeholder.com/150?text=Sundar",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EA] font-[Outfit] text-gray-800 px-6 py-12">
      {/* Intro Section */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-semibold mb-6">About PhiloMind</h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto">
          A space for emotional reflection and thoughtful awareness. We combine
          philosophy and psychology to help people explore their inner worlds,
          mindfully.
        </p>
      </div>

      {/* Philosophy and Mission */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-24">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
          <p className="text-base leading-relaxed text-gray-700">
            PhiloMind was built with the belief that self-awareness is not just
            emotional but also philosophical. We invite users to slow down,
            observe, and articulate what they feel with clarity and depth.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-base leading-relaxed text-gray-700">
            To offer a clean, thoughtful space where users can reflect, grow,
            and gain perspective. We believe in design that supports
            introspection — gentle, intuitive, and calming.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-3xl font-semibold mb-12">Meet the Team</h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-white shadow-md"
              />
              <div className="text-xl font-medium">{member.name}</div>
              <div className="text-sm text-gray-600">{member.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto text-center bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-base text-gray-600 mb-6">
          We'd love to hear from you — whether it's feedback, collaboration, or
          questions about PhiloMind. Reach out to us anytime.
        </p>
        <div className="space-y-2 text-gray-700 text-lg">
          <p className="w-full">
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
      <br />
      <br />
    </div>
  );
}