"use client"

import { ResponseStream } from "@/components/ui/response-stream"
import { useInView } from "framer-motion";
import { useRef } from "react";

export function ManagementTeam() {
    const text = `Boxspace Solutions Pvt. Ltd. was founded by Mr. Carl Cooper and Mr. P. V. Jose in 2015, both having over 20 years of experience in information management industry. The leadership team has successfully launched multiple startups in industry. Our professional operations team has many years of experience in the logistics and information management industries. Our combined experience in handling business critical processes and divisions ensures a smooth service delivery.`
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });


    return (
        <section ref={ref} className="section-container bg-background">
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="section-title text-primary mb-6">Management Team</h2>
                {isInView && (
                    <ResponseStream
                        textStream={text}
                        mode="fade"
                        className="text-lg text-muted-foreground leading-relaxed"
                        speed={80}
                    />
                )}
            </div>
        </section>
    )
}
