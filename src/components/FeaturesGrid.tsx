import { Car, Clock, List, Plus, Send, Headphones, Wrench, Gift } from 'lucide-react';

const features = [
  { icon: Car, label: 'গাড়ি বুকিং' },
  { icon: Clock, label: 'বুকিং হিস্ট্রি' },
  { icon: List, label: 'রাইডার লিস্ট' },
  { icon: Plus, label: 'অ্যাড মানি' },
  { icon: Send, label: 'সেন্ড মানি' },
  { icon: Headphones, label: 'সাপোর্ট' },
  { icon: Wrench, label: 'রুলস' },
  { icon: Gift, label: 'রেফারেল' },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <button className="bg-purple-100 rounded-lg p-3 w-16 h-16 flex items-center justify-center">
            <feature.icon className="h-8 w-8 text-purple-600" />
          </button>
          <p className="text-xs text-gray-700 font-medium">{feature.label}</p>
        </div>
      ))}
    </div>
  );
}