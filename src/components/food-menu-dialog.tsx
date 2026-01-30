"use client"
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function FoodMenuDialog({ restaurantName, open, onOpenChange, onAddToItinerary }: {
    restaurantName: string,
    open: boolean,
    onOpenChange: (v: boolean) => void,
    onAddToItinerary: (title: string, type: string, cost: number) => void
}) {
    const [selection, setSelection] = React.useState<{ type: string, price: number } | null>(null)

    const handleAdd = () => {
        if (selection) {
            onAddToItinerary(`${restaurantName} (${selection.type})`, "Food", selection.price)
            onOpenChange(false)
            setSelection(null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)}>
                <DialogHeader>
                    <DialogTitle>Select Meal Plan - {restaurantName}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-3 py-4">
                    <Button
                        variant={selection?.type === 'Breakfast' ? 'default' : 'outline'}
                        className="justify-between h-auto py-3"
                        onClick={() => setSelection({ type: 'Breakfast', price: 150 })}
                    >
                        <span>Breakfast Combo (Idli/Dosa)</span>
                        <span>₹150</span>
                    </Button>
                    <Button
                        variant={selection?.type === 'Lunch' ? 'default' : 'outline'}
                        className="justify-between h-auto py-3"
                        onClick={() => setSelection({ type: 'Lunch', price: 250 })}
                    >
                        <span>Lunch Thali</span>
                        <span>₹250</span>
                    </Button>
                    <Button
                        variant={selection?.type === 'Dinner' ? 'default' : 'outline'}
                        className="justify-between h-auto py-3"
                        onClick={() => setSelection({ type: 'Dinner', price: 200 })}
                    >
                        <span>Dinner Special</span>
                        <span>₹200</span>
                    </Button>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button onClick={handleAdd} disabled={!selection}>Add to Itinerary</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
