import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const DateTimePicker24h = ({ 
    value, 
    onChange, 
    placeholder = "Pilih Tanggal & Waktu",
    className,
    error 
}) => {
    const [date, setDate] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    React.useEffect(() => {
        setDate(value);
    }, [value]);

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const handleDateSelect = (selectedDate) => {
        if (selectedDate) {
            const newDate = date ? new Date(date) : new Date();
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
            
            if (!date) {
                const now = new Date();
                newDate.setHours(now.getHours());
                newDate.setMinutes(Math.round(now.getMinutes() / 5) * 5); 
            }
            setDate(newDate);
            onChange && onChange(newDate);
        }
    };

    const handleTimeChange = (type, value) => {
        if (date) {
            const newDate = new Date(date);
            if (type === "hour") {
                newDate.setHours(parseInt(value));
            } else if (type === "minute") {
                newDate.setMinutes(parseInt(value));
            }
            setDate(newDate);
            onChange && onChange(newDate);
        } else {
            const newDate = new Date();
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
            if (type === "hour") {
                newDate.setHours(parseInt(value));
            } else if (type === "minute") {
                newDate.setMinutes(parseInt(value));
            }
            setDate(newDate);
            onChange && onChange(newDate);
        }
    };

    return (
        <div className="w-full">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                            error && "border-red-500",
                            className
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                            format(date, "dd/MM/yyyy HH:mm")
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <div className="sm:flex">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            disabled={(date) => date > new Date()}
                            initialFocus
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                    {hours.map((hour) => (
                                        <Button
                                            key={hour}
                                            size="icon"
                                            variant={date && date.getHours() === hour ? "default" : "ghost"}
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() => handleTimeChange("hour", hour.toString())}
                                        >
                                            {hour.toString().padStart(2, '0')}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" className="sm:hidden" />
                            </ScrollArea>
                            <ScrollArea className="w-64 sm:w-auto">
                                <div className="flex sm:flex-col p-2">
                                    {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                        <Button
                                            key={minute}
                                            size="icon"
                                            variant={date && date.getMinutes() === minute ? "default" : "ghost"}
                                            className="sm:w-full shrink-0 aspect-square"
                                            onClick={() => handleTimeChange("minute", minute.toString())}
                                        >
                                            {minute.toString().padStart(2, '0')}
                                        </Button>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" className="sm:hidden" />
                            </ScrollArea>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};