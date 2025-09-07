"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Upload,
  Users,
  Zap,
  Shield,
  Globe,
  Code,
  Database,
  Server,
  Smartphone,
  Video,
  Heart,
  Share2,
  Eye,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function VideoLandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Upload & Share",
      description: "Upload your videos instantly with our seamless interface",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: "Stream Anywhere",
      description: "Watch videos without signing up, stream on any device",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Powered by ImageKit CDN for ultra-fast loading",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    {
      label: "Videos Uploaded",
      value: "10K+",
      icon: <Video className="h-5 w-5" />,
    },
    {
      label: "Active Users",
      value: "5K+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Hours Watched",
      value: "100K+",
      icon: <Eye className="h-5 w-5" />,
    },
    { label: "Countries", value: "50+", icon: <Globe className="h-5 w-5" /> },
  ];

  const techStack = [
    {
      name: "Next.js",
      icon: "/next.svg",
      description: "React framework for production",
    },
    {
      name: "MongoDB",
      icon: "/Mongodb--Streamline-Svg-Logos.svg",
      description: "NoSQL database for scalability",
    },
    {
      name: "ImageKit",
      icon: "/download.png",
      description: "CDN for optimized media delivery",
    },
    {
      name: "ShadCN/UI",
      icon: "/download (1).png",
      description: "Modern component library",
    },
    {
      name: "Node.js",
      icon: "/Nodejs--Streamline-Svg-Logos.svg",
      description: "JavaScript runtime environment",
    },
    {
      name: "TypeScript",
      icon: "/Typescript-Icon--Streamline-Svg-Logos.svg",
      description: "Type-safe development",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Play className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VideoStream
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:block">
              Features
            </Button>
            <Button variant="ghost" className="hidden md:block">
              About
            </Button>
            <Button onClick={() => router.push("/register")} variant="outline">
              Register{" "}
            </Button>
            <Button
              onClick={() => router.push("/videos")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
              🚀 Built with Modern MERN Stack
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Share Your{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Stories
              </span>
              <br />
              Stream Without{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Limits
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate video platform where creators upload seamlessly and
              viewers stream instantly. No barriers, just pure video experience
              powered by cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => router.push("/videos")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
              >
                <Play className="h-5 w-5 mr-2" fill="currentColor" />
                Start Watching
              </Button>
              <Button
                onClick={() => router.push("/upload")}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 hover:bg-gray-50"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100"
                >
                  <div className="flex items-center justify-center mb-2 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
              ✨ Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Video Success
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for creators and viewers alike, with powerful features that
              make video sharing effortless.
            </p>
          </div>

          {/* Dynamic Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                      currentFeature === index
                        ? "bg-gradient-to-r from-white to-gray-50 shadow-xl border-2 border-blue-200"
                        : "bg-gray-50 hover:bg-white hover:shadow-lg"
                    }`}
                    onClick={() => setCurrentFeature(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      VideoStream Platform
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Play
                        className="h-16 w-16 text-white"
                        fill="currentColor"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Heart className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl w-fit">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Enterprise-grade security with MongoDB and robust
                  authentication systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl w-fit">
                  <Smartphone className="h-6 w-6" />
                </div>
                <CardTitle>Mobile Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Responsive design that works perfectly on all devices and
                  screen sizes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl w-fit">
                  <Globe className="h-6 w-6" />
                </div>
                <CardTitle>Global CDN</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  ImageKit CDN ensures your videos load instantly anywhere in
                  the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200">
              ⚡ Technology Stack
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Modern Tech
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leveraging the latest technologies to deliver exceptional
              performance and user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{tech.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Developer Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200">
              👨‍💻 Meet the Developer
            </Badge>

            <div className="mb-12">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Code className="h-16 w-16 text-white" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Hi, I&apos;m a{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  MERN Stack Developer
                </span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Passionate about building modern web applications that solve
                real problems. I specialize in the MERN stack (MongoDB,
                Express.js, React, Node.js) and love creating seamless user
                experiences with cutting-edge technologies like Next.js,
                TypeScript, and modern UI libraries.
              </p>
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: <Database className="h-6 w-6" />,
                  name: "MongoDB",
                  level: "Expert",
                },
                {
                  icon: <Server className="h-6 w-6" />,
                  name: "Node.js",
                  level: "Expert",
                },
                {
                  icon: <Code className="h-6 w-6" />,
                  name: "React",
                  level: "Expert",
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  name: "Next.js",
                  level: "Advanced",
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {skill.icon}
                  </div>
                  <h3 className="font-bold mb-1">{skill.name}</h3>
                  <p className="text-sm text-gray-600">{skill.level}</p>
                </div>
              ))}
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                className="gap-2 hover:bg-gray-900 hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
                <ExternalLink className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-blue-600 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
                <ExternalLink className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-red-500 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                Email Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Start Your
            <br />
            <span className="text-yellow-300">Video Journey?</span>
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of creators and viewers who trust our platform for
            their video needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-black hover:text-white transition-colors duration-400 ease-in-out text-lg px-8 py-6"
            >
              <Play className="h-5 w-5 mr-2" fill="currentColor" />
              Start Watching Now
            </Button>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-black hover:text-white transition-colors duration-400 ease-in-out text-lg px-8 py-6"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload Your First Video
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Play className="h-6 w-6 text-white" fill="currentColor" />
                </div>
                <span className="text-xl font-bold">VideoStream</span>
              </div>
              <p className="text-gray-400">
                The modern video platform built with MERN stack technology.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <div className="space-y-2 text-gray-400">
                <div>Watch Videos</div>
                <div>Upload Content</div>
                <div>Create Account</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Technology</h3>
              <div className="space-y-2 text-gray-400">
                <div>MERN Stack</div>
                <div>Next.js</div>
                <div>ImageKit CDN</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="space-y-2 text-gray-400">
                <div>GitHub</div>
                <div>LinkedIn</div>
                <div>Email</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 VideoStream. Built with ❤️ using MERN Stack.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
