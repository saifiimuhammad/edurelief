import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, GraduationCap } from "lucide-react";

export default function SDGSection() {
  const sdgs = [
    {
      number: "1",
      title: "No Poverty",
      description: "Breaking the cycle of poverty through education access",
      icon: Users,
      color: "bg-red-500",
      stats: "67% of students from low-income families",
    },
    {
      number: "2",
      title: "Zero Hunger",
      description: "Supporting meal plans and nutrition for students",
      icon: Heart,
      color: "bg-yellow-500",
      stats: "24% of funding includes meal support",
    },
    {
      number: "4",
      title: "Quality Education",
      description: "Ensuring inclusive and equitable quality education",
      icon: GraduationCap,
      color: "bg-blue-500",
      stats: "92% graduation rate among funded students",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Supporting UN Sustainable Development Goals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every donation and student success story contributes to achieving
            global sustainable development goals. Together, we&apos;re building
            a more equitable world through education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sdgs.map((sdg) => (
            <Card
              key={sdg.number}
              className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 ${sdg.color}`}
              />
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${sdg.color} flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {sdg.number}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {sdg.title}
                    </CardTitle>
                    <div className="text-sm text-gray-500 mt-1">
                      {sdg.stats}
                    </div>
                  </div>
                  <sdg.icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{sdg.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-medium">
            <span>Learn more about our impact at</span>
            <a
              href="https://sdgs.un.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              UN SDGs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
