export async function generatePdf(element: HTMLElement | null): Promise<void> {
    if (!element) {
        console.error("PDF generation failed: The target element is not available.");
        return;
    }

    // Dynamically import the libraries only when the function is called.
    // This prevents them from being part of the initial app bundle.
    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');

    const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        backgroundColor: '#0f172a', // Explicitly set background
        useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasHeight / canvasWidth;
    const imgHeight = pdfWidth * ratio;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
    }

    pdf.save('literary-expressions.pdf');
}
