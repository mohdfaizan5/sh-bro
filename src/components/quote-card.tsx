"use client";
import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { Quote } from "lucide-react";

const QuoteCard = () => {
  const quotes = [
    "The Magic you're looking for is in the work you're avoiding",
    "The best way to predict the future is to invent it",
    "The best preparation for tomorrow is doing your best today",
    "The future belongs to those who believe in the beauty of their dreams",
    "Your too concerned with what was and what will be",
    "When it pains, tell 'This is what we do!'",
  ];
  const [quote, setQuote] = React.useState(quotes[0]);

  useEffect(() => {
    const quotesInterval = setInterval(() => {
      setQuote(quotes[(Math.random() * quotes.length) | 0]);
    }, 5000);
    // return () => {
    //   second;
    // };
    return () => clearInterval(quotesInterval);
  }, []);
  return (
    <Card className="p-4 flex gap-[2px] bg-black/80 text-white transition-all fade-in-35">
      <Quote className="fill-white rotate-180" size={14} />
      <p className="text-lg text-center font-medium">{quote}</p>
      
      <Quote className="fill-white" size={16} />
    </Card>
  );
};

export default QuoteCard;
