"use client"
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Printer, Download, QrCode } from "lucide-react"

export function EBillDialog({ open, onOpenChange, items, total }: { open: boolean, onOpenChange: (open: boolean) => void, items: any[], total: number }) {
    const [qrCodeUrl, setQrCodeUrl] = React.useState<string>("")
    const bookingId = React.useMemo(() => `TOUR-${Math.floor(Math.random() * 10000)}`, [])
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    // Generate QR Code using Canvas API (no external library needed)
    React.useEffect(() => {
        if (open && canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            if (!ctx) return

            // Payment data to encode
            const paymentData = `upi://pay?pa=toursafe@upi&pn=TourSafe&am=${total}&cu=INR&tn=Booking ${bookingId}`

            // Simple QR code pattern (for demo - in production use a proper QR library)
            const size = 200
            canvas.width = size
            canvas.height = size

            // White background
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, size, size)

            // Black border
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, size, 10)
            ctx.fillRect(0, size - 10, size, 10)
            ctx.fillRect(0, 0, 10, size)
            ctx.fillRect(size - 10, 0, 10, size)

            // QR pattern (simplified grid pattern for demo)
            const gridSize = 8
            const cellSize = (size - 40) / gridSize
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if ((i + j) % 2 === 0 || (i === 0 && j === 0) || (i === gridSize - 1 && j === 0) || (i === 0 && j === gridSize - 1)) {
                        ctx.fillRect(20 + i * cellSize, 20 + j * cellSize, cellSize - 2, cellSize - 2)
                    }
                }
            }

            // Center logo area
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(size / 2 - 20, size / 2 - 20, 40, 40)
            ctx.fillStyle = '#000000'
            ctx.font = 'bold 16px Arial'
            ctx.textAlign = 'center'
            ctx.fillText('TS', size / 2, size / 2 + 5)

            setQrCodeUrl(canvas.toDataURL())
        }
    }, [open, total, bookingId])

    const handleDownloadReceipt = () => {
        const receiptContent = `
            ═══════════════════════════════════════
                    TOURSAFE BOOKING RECEIPT
            ═══════════════════════════════════════
            
            Booking ID: ${bookingId}
            Date: ${new Date().toLocaleDateString()}
            Time: ${new Date().toLocaleTimeString()}
            
            ───────────────────────────────────────
            ITEMS
            ───────────────────────────────────────
            ${items.map(item => `${item.title}\n${item.type} - ₹${item.cost}`).join('\n\n')}
            
            ───────────────────────────────────────
            TOTAL AMOUNT: ₹${total}
            ───────────────────────────────────────
            
            Payment Method: UPI/QR Code
            Status: Pending
            
            Thank you for choosing TourSafe!
            For support: support@toursafe.com
            
            ═══════════════════════════════════════
        `

        const blob = new Blob([receiptContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `TourSafe_Receipt_${bookingId}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        Payment & Booking Details
                    </DialogTitle>
                    <DialogDescription>
                        Booking ID: <span className="font-mono font-semibold">#{bookingId}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    {/* Left: Bill Details */}
                    <div className="space-y-4">
                        <div className="border rounded-lg p-4 bg-muted/20">
                            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Booking Summary</h3>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 text-left font-medium">Item</th>
                                        <th className="py-2 text-left font-medium">Type</th>
                                        <th className="py-2 text-right font-medium">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, i) => (
                                        <tr key={i} className="border-b last:border-0">
                                            <td className="py-2 text-xs">{item.title}</td>
                                            <td className="py-2 text-xs text-muted-foreground">{item.type}</td>
                                            <td className="py-2 text-right text-xs">₹{item.cost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="font-bold text-base border-t-2">
                                        <td className="py-3">TOTAL</td>
                                        <td></td>
                                        <td className="py-3 text-right text-primary">₹{total}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-1 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900">
                            <p className="font-semibold text-blue-900 dark:text-blue-100">Payment Instructions:</p>
                            <p>1. Scan the QR code with any UPI app</p>
                            <p>2. Verify the amount (₹{total})</p>
                            <p>3. Complete the payment</p>
                            <p>4. Screenshot the confirmation</p>
                        </div>
                    </div>

                    {/* Right: QR Code */}
                    <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg bg-white dark:bg-zinc-900">
                            <canvas ref={canvasRef} className="hidden" />
                            {qrCodeUrl && (
                                <img
                                    src={qrCodeUrl}
                                    alt="Payment QR Code"
                                    className="w-48 h-48 border-4 border-white shadow-lg rounded-lg"
                                />
                            )}
                            <p className="text-sm font-semibold mt-4 text-center">Scan to Pay ₹{total}</p>
                            <p className="text-xs text-muted-foreground text-center mt-1">UPI Payment</p>
                            <div className="mt-4 flex gap-2">
                                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                                    Google Pay
                                </div>
                                <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                                    PhonePe
                                </div>
                                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                                    Paytm
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-center text-muted-foreground bg-muted/30 p-3 rounded-lg">
                            <p className="font-semibold mb-1">Booking will be confirmed after payment</p>
                            <p>Receipt will be sent to your email</p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={handleDownloadReceipt}>
                        <Download className="mr-2 h-4 w-4" /> Download Receipt
                    </Button>
                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
