import Image from "next/image";
import type { Metadata } from "next";
import styles from "./page.module.css";
import Hero from "@/app/components/global/Hero";
import Callout from "@/app/components/global/Callout";

export const metadata: Metadata = {
    title: "Andrew Magill: Web Developer",
    description: "Frontend Architect and Web Development Manager",
};

export default function Home() {
  return (
    <main className={styles.main}>
        <div className={styles.wrapper}>
            <Hero>
                <h1>
                    <strong>Hey there, I’m Andrew&nbsp;Magill.</strong> I’m a 
                    senior web <a href="https://github.com/andymagill">developer</a> from 
                    New&nbsp;York with deep experience building custom websites and web 
                    applications. I’m currently looking for new challenges and
                    interesting opportunities. I built this page to showcase some 
                    of <a href="https://www.linkedin.com/in/andrew-magill">my&nbsp;work</a>.
                </h1>

                <Image src="/images/portrait-andrew-magill.jpg" 
                    alt="Andrew Magill: Web Developer" 
                    className={styles.portrait}
                    width={300} height={300} 
                />
            </Hero>

            <section className={styles.serviceList}>
                <Callout
                    title="Implementation Management"
                    description="I help the team prioritize and execute projects on time, within budget, and exceed expectations."
                    icon="/icons/management.svg"
                />
                <Callout
                    title="Software Engineering"
                    description="I architect web applications, tailored to clients' needs and requirements."
                    icon="/icons/engineering.svg"
                />
                <Callout
                    title="Process Automation"
                    description="I implement tools to allow the clients to set ambitious goals, and focus on their core business."
                    icon="/icons/process.svg"
                />
            </section>
        </div>
    </main>
  );
}
