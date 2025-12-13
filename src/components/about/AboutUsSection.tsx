
"use client"

import React, { useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Pen,
    PaintBucket,
    Home,
    Ruler,
    PenTool,
    Building2,
    CheckCircle,
    Sparkles,
    Star,
    Zap,
    Box,
    ShoppingBag,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import CargoBox from "./CargoBox"

export default function AboutUsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
    const [isRecordsPopoverOpen, setIsRecordsPopoverOpen] = useState(false);
    const [isSelfStoragePopoverOpen, setIsSelfStoragePopoverOpen] = useState(false);
    const [isDigitizationPopoverOpen, setIsDigitizationPopoverOpen] = useState(false);
    const [isLockedRoomsPopoverOpen, setIsLockedRoomsPopoverOpen] = useState(false);
    const [isBusinessAssetPopoverOpen, setIsBusinessAssetPopoverOpen] = useState(false);
    const [isEcommercePopoverOpen, setIsEcommercePopoverOpen] = useState(false);
    const [isOpenStoragePopoverOpen, setIsOpenStoragePopoverOpen] = useState(false);


    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    const services = [
        {
            icon: <Pen className="w-6 h-6" />,
            secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-accent" />,
            title: "Records Management",
            description: "Comprehensive information lifecycle management that includes Inventorization, Barcoding.",
            detailedDescription: "Our Records Management Services (RMS) are designed to provide offsite and onsite storage and management services that are customized to the corporate policies and processes of our customers. Our customized services offer a solution that addresses the challenges of active and archival records. Our trained team of professionals will collect, barcode, box and store your files and documents. Our software ensures accurate and timely retrievals of both physical and electronic data. We offer dedicated record rooms at our facility for corporates with specific document requirements (loan files, agreement files, etc.)",
            position: "left",
        },
        {
            icon: <Home className="w-6 h-6" />,
            secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-accent" />,
            title: "Digitization",
            description:
                "Our experienced team can be deployed at your premises to convert your documents to multiple digital formats.",
            detailedDescription: "Our Digitization Services for documents is critical in ensuring data availability online. The work from home (WFH) era requires instant access to information and we have scanned crores of documents to enable digital access to information. Our scanning Process can be extended to include document auditing, data capture, verification and validation services",
            position: "left",
        },
        {
            icon: <PenTool className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-accent" />,
            title: "Business Asset",
            description:
                "Flexible and customizable storage for corporate business assets like stationary, furniture & more.",
            detailedDescription: "Our customized Business Asset solutions have been implemented to store and manage different business assets like uniforms, stationary, marketing materials, high value stock, Sports equipment, IT equipments, furniture and fixtures. We offer corporate relocation services that include packing, moving and unpacking services for office movement.",
            position: "left",
        },
        {
            icon: <ShoppingBag className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-accent" />,
            title: "Ecommerce Fulfillment",
            description:
                "Accurate and timely fulfillment from our warehouse, integration with multiple marketplace softwares.",
            detailedDescription: "In the age of Ecommerce, our expertise in storage and management has enabled small and medium entrepreneurs to focus on selling their products online, while we manage the fulfilment and returns. We work with all the major market places to ensure timely and accurate deliveries. Our network of last mile delivery partners ensures our customers can focus on sales to any part of the country.",
            position: "left",
        },
        {
            icon: <PaintBucket className="w-6 h-6" />,
            secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-accent" />,
            title: "Self Storage",
            description:
                "Secure and demarcated warehouse storage, with no minimum space or time commitments.",
            detailedDescription: "Our Self Storage services for individuals are designed to offer expandable open storage, locked dedicated room and indoor bike storage. Our services include manpower, transport and packing materials like cartons, labels, tapes and wraps.",
            position: "right",
        },
        {
            icon: <Ruler className="w-6 h-6" />,
            secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-accent" />,
            title: "Locked Rooms",
            description:
                "Dedicated and monitored rooms for your precious memories and possessions.",
            detailedDescription: "Dedicated and monitored rooms for your precious memories and possessions. Our dedicated rooms are available in 3 sizes and come fitted with CCTV, smoke detection and access control to ensure complete security.",
            position: "right",
        },
         {
            icon: <Box className="w-6 h-6" />,
            secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-accent" />,
            title: "Open Storage",
            description: "Secure and demarcated warehouse storage, with no minimum space or time commitments.",
            detailedDescription: "Secure and demarcated warehouse storage, with no minimum space or time commitments. Our open flexible storage solutions are ideal for customers who are renovating their homes, moving home or just need a little extra space for their belongings.",
            position: "right",
        },
    ]

    return (
        <section
            id="about-section"
            ref={sectionRef}
            className="w-full py-24 px-4 bg-background text-foreground overflow-hidden relative"
        >
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
                style={{ y: y1, rotate: rotate1 }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
                style={{ y: y2, rotate: rotate2 }}
            />
            <motion.div
                className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-primary/30"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-accent/30"
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="container mx-auto max-w-6xl relative z-10"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
                    <motion.span
                        className="text-primary font-medium mb-2 flex items-center gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Zap className="w-4 h-4" />
                        DISCOVER OUR STORY
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-light mb-4 text-center">About Us</h2>
                    <motion.div
                        className="w-24 h-1 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                </motion.div>

                <motion.div className="text-center max-w-3xl mx-auto mb-16 text-muted-foreground" variants={itemVariants}>
                    <p>Boxspace Solutions Pvt Ltd. is a storage and management company based out of Thane, Maharashtra. Our specialized storage and management expertise is available for both individuals and corporates to address their specific requirements. Our customized solutions leverage 6 years of experience and encompass multiple industries and verticals.</p>
                    <br />
                    <p>Our corporate services include comprehensive solutions for record management (RMS), scanning, business assets and Ecommerce order fulfilment.
                    Our individual services include open flexible and dedicated rooms for self storage solutions.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="space-y-8">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-semibold text-primary mb-8 text-center md:text-left relative pb-2">
                                Corporate Services
                                <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-20 h-0.5 bg-primary"></span>
                            </h3>
                        </motion.div>
                        {services
                            .filter((service) => service.position === "left")
                            .map((service, index) => {
                                if (service.detailedDescription) {
                                    const isOpen = 
                                        (service.title === "Records Management" && isRecordsPopoverOpen) ||
                                        (service.title === "Digitization" && isDigitizationPopoverOpen) ||
                                        (service.title === "Business Asset" && isBusinessAssetPopoverOpen) ||
                                        (service.title === "Ecommerce Fulfillment" && isEcommercePopoverOpen);
                                    
                                    const setOpen = 
                                        service.title === "Records Management" ? setIsRecordsPopoverOpen :
                                        service.title === "Digitization" ? setIsDigitizationPopoverOpen :
                                        service.title === "Business Asset" ? setIsBusinessAssetPopoverOpen :
                                        service.title === "Ecommerce Fulfillment" ? setIsEcommercePopoverOpen :
                                        () => {};

                                    return (
                                        <Popover key={`left-${index}`} open={isOpen} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                                                <div>
                                                    <ServiceItem
                                                        icon={service.icon}
                                                        secondaryIcon={service.secondaryIcon}
                                                        title={service.title}
                                                        description={service.description}
                                                        variants={itemVariants}
                                                        delay={index * 0.2}
                                                        direction="left"
                                                    />
                                                </div>
                                            </PopoverTrigger>
                                            <AnimatePresence>
                                            {isOpen && (
                                            <PopoverContent 
                                                asChild 
                                                onMouseEnter={() => setOpen(true)} 
                                                onMouseLeave={() => setOpen(false)}
                                                className="w-80 border-primary/20 bg-card/80 backdrop-blur-md shadow-2xl shadow-primary/10"
                                            >
                                                 <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                >
                                                    <div className="grid gap-4">
                                                        <div className="space-y-2">
                                                            <h4 className="font-medium leading-none text-primary">{service.title}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {service.detailedDescription}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </PopoverContent>
                                            )}
                                            </AnimatePresence>
                                        </Popover>
                                    )
                                }
                                return (
                                    <ServiceItem
                                        key={`left-${index}`}
                                        icon={service.icon}
                                        secondaryIcon={service.secondaryIcon}
                                        title={service.title}
                                        description={service.description}
                                        variants={itemVariants}
                                        delay={index * 0.2}
                                        direction="left"
                                    />
                                )
                            })}
                    </div>

                    <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0 h-[400px] md:h-auto">
                        <CargoBox />
                    </div>

                    <div className="space-y-8">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-semibold text-accent mb-8 text-center md:text-left relative pb-2">
                                Individual Services
                                <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-20 h-0.5 bg-accent"></span>
                            </h3>
                        </motion.div>
                        {services
                            .filter((service) => service.position === "right")
                            .map((service, index) => {
                                if (service.detailedDescription) {
                                     const isOpen = 
                                        (service.title === "Self Storage" && isSelfStoragePopoverOpen) ||
                                        (service.title === "Locked Rooms" && isLockedRoomsPopoverOpen) ||
                                        (service.title === "Open Storage" && isOpenStoragePopoverOpen);
                                    
                                    const setOpen = 
                                        service.title === "Self Storage" ? setIsSelfStoragePopoverOpen :
                                        service.title === "Locked Rooms" ? setIsLockedRoomsPopoverOpen :
                                        service.title === "Open Storage" ? setIsOpenStoragePopoverOpen :
                                        () => {};
                                    return (
                                        <Popover key={`right-${index}`} open={isOpen} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                                                <div>
                                                    <ServiceItem
                                                        icon={service.icon}
                                                        secondaryIcon={service.secondaryIcon}
                                                        title={service.title}
                                                        description={service.description}
                                                        variants={itemVariants}
                                                        delay={index * 0.2}
                                                        direction="right"
                                                    />
                                                </div>
                                            </PopoverTrigger>
                                            <AnimatePresence>
                                            {isOpen && (
                                            <PopoverContent 
                                                asChild 
                                                onMouseEnter={() => setOpen(true)} 
                                                onMouseLeave={() => setOpen(false)}
                                                className="w-80 border-primary/20 bg-card/80 backdrop-blur-md shadow-2xl shadow-primary/10"
                                            >
                                                 <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                >
                                                    <div className="grid gap-4">
                                                        <div className="space-y-2">
                                                            <h4 className="font-medium leading-none text-primary">{service.title}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {service.detailedDescription}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </PopoverContent>
                                            )}
                                            </AnimatePresence>
                                        </Popover>
                                    )
                                }
                                return (
                                <ServiceItem
                                    key={`right-${index}`}
                                    icon={service.icon}
                                    secondaryIcon={service.secondaryIcon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants}
                                    delay={index * 0.2}
                                    direction="right"
                                />
                            )})}
                    </div>
                </div>


            </motion.div>
        </section>
    )
}

interface ServiceItemProps {
    icon: React.ReactNode
    secondaryIcon?: React.ReactNode
    title: string
    description: string
    variants: {
        hidden: { opacity: number; y?: number }
        visible: { opacity: number; y?: number; transition: { duration: number; ease: string } }
    }
    delay: number
    direction: "left" | "right"
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
    return (
        <motion.div
            className="flex flex-col group"
            variants={variants}
            transition={{ delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.2 }}
            >
                <motion.div
                    className="text-primary bg-primary/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-primary/20 relative"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                >
                    {icon}
                    {secondaryIcon}
                </motion.div>
                <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>
            </motion.div>
            <motion.p
                className="text-sm text-muted-foreground leading-relaxed md:pl-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.4 }}
            >
                {description}
            </motion.p>
        </motion.div>
    )
}
    

    

    
