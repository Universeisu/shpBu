
async function printPDF() {
    const { PDFDocument, rgb } = PDFLib;

    // Create a new PDF document
    const doc = await PDFDocument.create();
    const page = doc.addPage();

    // Set page size
    page.setSize(600, 800);

    // Add content to the page
    const fontSize = 12;
    const margin = 50;
    let y = page.getHeight() - margin;

    // Title
    page.drawText("Shopping Receipt", {
        x: margin,
        y,
        size: 20,
        color: rgb(0, 0, 0),
    });
    y -= fontSize * 2;

    // Items in the cart
    let totalPrice = 0;
    for (const productId in cart) {
        const item = cart[productId];
        const itemTotalPrice = item.quantity * item.price;
        totalPrice += itemTotalPrice;

        page.drawText(
            `: ${productId}, Quantity: ${item.quantity}, Price: ฿ ${item.price}, Total: ฿ ${itemTotalPrice}`,
            {
                x: margin,
                y,
                size: fontSize,
                color: rgb(0, 0, 0),
            }
        );
        y -= fontSize;
    }

    // Total price
    page.drawText(`Total Price: ฿ ${totalPrice}`, {
        x: margin,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
    });
    y -= fontSize * 2;

    // Additional details (e.g., customer name and phone number)
    const name = "Fahsai";
    const phoneNumber = "654259029";
    page.drawText(`Name: ${name}`, {
        x: margin,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
    });
    y -= fontSize;
    page.drawText(`Phone Number: ${phoneNumber}`, {
        x: margin,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
    });

    // Save the document
    const pdfBytes = await doc.save();

    // Create a blob from the PDF data
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "shopping_receipt.pdf";
    link.click();
}

