"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ShieldCheck } from "lucide-react"

export function ManualItinerary({ items, onRemove, onBook }: {
    items: { id: string, title: string, type: string, cost: number }[],
    onRemove: (id: string) => void,
    onBook: () => void
}) {
    const total = items.reduce((acc, item) => acc + item.cost, 0)

    return (
        <Card className="h-full flex flex-col shadow-md border-t-4 border-t-primary">
            <CardHeader className="pb-3 border-b bg-muted/10">
                <CardTitle className="text-xl flex items-center justify-between">
                    My Itinerary
                    <ShieldCheck className="text-green-600 h-5 w-5" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pt-4 space-y-3 min-h-[300px] max-h-[500px]">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-10 text-sm gap-2">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">?</div>
                        Your itinerary is empty. <br />Add guides, hotels, or food to start planning!
                    </div>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-card rounded-lg border shadow-sm group hover:border-primary/50 transition-colors">
                            <div className="overflow-hidden">
                                <div className="font-medium truncate">{item.title}</div>
                                <div className="text-xs text-muted-foreground flex gap-2">
                                    <span className="bg-secondary px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{item.type}</span>
                                    {item.cost > 0 && <span className="font-semibold text-primary">₹ {item.cost}</span>}
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-70 group-hover:opacity-100" onClick={() => onRemove(item.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))
                )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex flex-col gap-4 bg-muted/10">
                <div className="flex justify-between w-full font-bold text-lg">
                    <span>Total Estimated:</span>
                    <span className="flex items-center text-primary">₹ {total}</span>
                </div>
                <Button className="w-full text-lg shadow-lg" size="lg" disabled={items.length === 0} onClick={onBook}>
                    Book & Pay Total
                </Button>
            </CardFooter>
        </Card>
    )
}
