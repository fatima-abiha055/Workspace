// Demo workspace data — frontend only, no backend required.
const workspaces = [
  {
    id: "ws-1",
    name: "Focus Desk",
    type: "Hot Desk",
    capacity: 1,
    location: "Downtown Hub, Floor 2",
    price: 5,
    rating: 4.6,
    available: true,
    hours: "8:00 AM – 10:00 PM",
    amenities: ["Wi-Fi", "Power Outlets", "Coffee"],
    description:
      "A quiet, flexible desk for individuals who need a reliable spot to get things done without a long-term commitment.",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-2",
    name: "Creative Corner",
    type: "Hot Desk",
    capacity: 1,
    location: "Riverside Campus, Floor 1",
    price: 6,
    rating: 4.4,
    available: true,
    hours: "8:00 AM – 10:00 PM",
    amenities: ["Wi-Fi", "Power Outlets", "Whiteboard"],
    description:
      "A bright corner desk near natural light, popular with designers and writers who like a change of scenery.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-3",
    name: "Executive Desk",
    type: "Dedicated Desk",
    capacity: 1,
    location: "Downtown Hub, Floor 5",
    price: 9,
    rating: 4.8,
    available: true,
    hours: "24/7 Access",
    amenities: ["Wi-Fi", "Power Outlets", "Printer", "Coffee"],
    description:
      "Your own reserved desk with storage, ideal for regular members who want consistency every day.",
    image:
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-4",
    name: "Startup Hub",
    type: "Dedicated Desk",
    capacity: 2,
    location: "Innovation Park, Floor 3",
    price: 8,
    rating: 4.5,
    available: false,
    hours: "8:00 AM – 10:00 PM",
    amenities: ["Wi-Fi", "Power Outlets", "Air Conditioning"],
    description:
      "A dedicated two-seat setup built for early-stage founders who want to sit near other builders.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-5",
    name: "Private Office A",
    type: "Private Office",
    capacity: 4,
    location: "Downtown Hub, Floor 6",
    price: 18,
    rating: 4.9,
    available: true,
    hours: "24/7 Access",
    amenities: ["Wi-Fi", "Air Conditioning", "Whiteboard", "Printer"],
    description:
      "A fully enclosed office for small teams who need privacy for calls and focused work.",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-6",
    name: "Private Office B",
    type: "Private Office",
    capacity: 6,
    location: "Riverside Campus, Floor 4",
    price: 22,
    rating: 4.7,
    available: true,
    hours: "24/7 Access",
    amenities: ["Wi-Fi", "Air Conditioning", "Projector", "Coffee"],
    description:
      "A larger private suite with a meeting corner, well suited to growing teams of up to six.",
    image:
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-7",
    name: "Team Workspace",
    type: "Dedicated Desk",
    capacity: 4,
    location: "Innovation Park, Floor 2",
    price: 10,
    rating: 4.3,
    available: true,
    hours: "8:00 AM – 10:00 PM",
    amenities: ["Wi-Fi", "Power Outlets", "Whiteboard", "Parking"],
    description:
      "A cluster of four desks arranged for a small team that wants to sit together but keep costs low.",
    image:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-8",
    name: "Quiet Zone",
    type: "Hot Desk",
    capacity: 1,
    location: "Riverside Campus, Floor 2",
    price: 5,
    rating: 4.5,
    available: true,
    hours: "8:00 AM – 10:00 PM",
    amenities: ["Wi-Fi", "Power Outlets"],
    description:
      "A silence-first area for deep work, phone calls are not permitted in this zone.",
    image:
      "https://images.unsplash.com/photo-1524749292158-7540c2494485?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-9",
    name: "Collaboration Space",
    type: "Dedicated Desk",
    capacity: 3,
    location: "Innovation Park, Floor 1",
    price: 9,
    rating: 4.2,
    available: true,
    hours: "8:00 AM – 10:00 PM",
    amenities: ["Wi-Fi", "Whiteboard", "Coffee", "Parking"],
    description:
      "An open bench designed for pair programming, brainstorming and quick team huddles.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ws-10",
    name: "Premium Desk",
    type: "Dedicated Desk",
    capacity: 1,
    location: "Downtown Hub, Floor 7",
    price: 12,
    rating: 4.9,
    available: true,
    hours: "24/7 Access",
    amenities: ["Wi-Fi", "Power Outlets", "Air Conditioning", "Coffee", "Printer"],
    description:
      "Top-floor desk with skyline views, ergonomic chair, and dual monitors included.",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80",
  },
];

export default workspaces;
