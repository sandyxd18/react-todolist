import { techStackItems } from "../data/tech-stack";

export default function TechStack() {
  return (
    <section className="max-w-xl">
      <h1 className="text-3xl font-bold text-center text-primary mb-10">
        Tech Stack
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {techStackItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-2"
          >
            <p className="text-sm text-primary font-semibold">{item.title}</p>
            <div className="flex flex-row">
              <img
                src={item.image}
                alt={item.title}
                className="h-16 object-contain"
              />
              {item.image2 && (
                <img
                  src={item.image2}
                  alt={item.title2}
                  className="h-16 object-contain ml-2"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
