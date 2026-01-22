import { Smartphone, Shield, Globe, Zap, Cpu, Heart, Users, Star, Lock, Crown } from 'lucide-react'

export interface ScriptSegment {
    time: string
    title: string
    content: string
    duration: number
}

export const SCRIPT: ScriptSegment[] = [
    {
        time: "0:00-0:25",
        title: "Problem",
        content: "Millions of people lose the ability to communicate because of paralysis, stroke, ALS, or critical illness. Today, the primary solution is specialized eye-tracking hardware that costs over ten thousand dollars. That makes basic communication inaccessible to most families, hospitals, and public systems.",
        duration: 25,
    },
    {
        time: "0:25-0:45",
        title: "Solution",
        content: "GAZE replaces that hardware with software. It uses the camera already present on phones, tablets, and laptops to enable gaze-based typing and speech — without proprietary devices, installations, or infrastructure changes.",
        duration: 20,
    },
    {
        time: "0:45-1:10",
        title: "Live Proof",
        content: "This is not a concept. This is a working system. Everything you see here runs in the browser, with on-device processing and no biometric data storage.",
        duration: 25,
    },
    {
        time: "1:10-1:30",
        title: "Impact & Scale",
        content: "By removing hardware, GAZE reduces cost by over ninety percent. It requires zero additional devices and can be deployed globally through software. That allows accessibility to scale like infrastructure, not like medical equipment.",
        duration: 20,
    },
    {
        time: "1:30-1:50",
        title: "Why Now",
        content: "This is possible now because cameras are ubiquitous, computer vision runs efficiently on-device, and healthcare systems are actively seeking low-cost assistive solutions. Accessibility is no longer a niche — it's becoming public infrastructure.",
        duration: 20,
    },
    {
        time: "1:50-2:00",
        title: "Decision Frame",
        content: "GAZE restores a fundamental human capability — communication — using software that can scale globally, without compromising dignity, privacy, or safety.",
        duration: 10,
    },
]

export const SOLUTION_FEATURES = [
    {
        icon: Smartphone,
        title: "Uses Existing Devices",
        description: "Works on any smartphone, tablet, or laptop with a camera"
    },
    {
        icon: Shield,
        title: "On-Device Processing",
        description: "All processing happens locally, no data leaves the device"
    },
    {
        icon: Globe,
        title: "Global Accessibility",
        description: "Browser-based deployment works across all regions"
    },
    {
        icon: Zap,
        title: "Instant Setup",
        description: "No installation required, works directly in browser"
    }
]

export const METRICS = [
    {
        value: "≥90%",
        label: "Cost Reduction",
        description: "Compared to hardware-based assistive systems",
        color: "bg-slate-900"
    },
    {
        value: "$0",
        label: "Additional Hardware",
        description: "Required for deployment - uses existing devices",
        color: "bg-slate-900"
    },
    {
        value: "Global",
        label: "Deployment Scale",
        description: "Web-based architecture works across all regions",
        color: "bg-slate-900"
    }
]

export const WHY_NOW_ITEMS = [
    {
        icon: Smartphone,
        title: "Cameras are ubiquitous across consumer devices",
        detail: "Over 6 billion smartphones worldwide with capable cameras"
    },
    {
        icon: Cpu,
        title: "Computer vision models run efficiently on-device",
        detail: "ONNX runtime enables local AI processing without cloud dependency"
    },
    {
        icon: Heart,
        title: "Healthcare systems seek low-cost assistive solutions",
        detail: "Cost pressure drives innovation in accessible care delivery"
    },
    {
        icon: Users,
        title: "Accessibility treated as public infrastructure",
        detail: "Global shift toward inclusive design and universal access"
    }
]

export const ETHICAL_PRINCIPLES = [
    {
        principle: "Dignity",
        description: "Preserves user agency and autonomy in communication",
        icon: Star
    },
    {
        principle: "Privacy",
        description: "On-device processing, no biometric data storage",
        icon: Lock
    },
    {
        principle: "Access",
        description: "Free for individuals, scalable for institutions",
        icon: Crown
    }
]