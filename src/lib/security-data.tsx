import { ShieldCheck, Video, Thermometer, Siren } from 'lucide-react';
import React from "react";

export const securityCardData = [
    {
        id: 1,
        title: "24/7 CCTV Surveillance",
        description: "Our facilities are monitored around the clock with high-definition security cameras, ensuring constant oversight of your valuable assets.",
        color: "hsl(var(--primary))",
        icon: <Video className="w-16 h-16" />
    },
    {
        id: 2,
        title: "Biometric Access Control",
        description: "Only authorized personnel can access sensitive areas, thanks to our state-of-the-art biometric fingerprint and facial recognition systems.",
        color: "hsl(var(--primary))",
        icon: <ShieldCheck className="w-16 h-16" />
    },
    {
        id: 3,
        title: "Climate & Humidity Control",
        description: "We maintain optimal environmental conditions to protect delicate items from damage due to temperature fluctuations or humidity.",
        color: "hsl(var(--primary))",
        icon: <Thermometer className="w-16 h-16" />
    },
    {
        id: 4,
        title: "Advanced Fire & Intrusion Alarms",
        description: "Our integrated alarm systems provide immediate alerts for any unauthorized entry or fire, with a direct line to emergency services.",
        color: "hsl(var(--primary))",
        icon: <Siren className="w-16 h-16" />
    },
];
