import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData } from '../contexts/ResumeContext';

export const exportToPDF = async (resumeData: ResumeData): Promise<void> => {
  const element = document.getElementById('resume-preview');
  if (!element) {
    throw new Error('Resume preview element not found');
  }

  try {
    // Ensure all fonts and styles are loaded
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create canvas from the resume element with better options
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        // Ensure the cloned document has proper styling
        const clonedElement = clonedDoc.getElementById('resume-preview');
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.width = 'auto';
          clonedElement.style.height = 'auto';
          clonedElement.style.maxWidth = 'none';
          clonedElement.style.maxHeight = 'none';
          clonedElement.style.overflow = 'visible';
        }
      }
    });

    // Calculate dimensions for A4 page
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate scaling to fit the page while maintaining aspect ratio
    const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));
    const scaledWidth = (imgWidth * 0.264583) * ratio;
    const scaledHeight = (imgHeight * 0.264583) * ratio;
    
    // Center the image on the page
    const imgX = (pdfWidth - scaledWidth) / 2;
    const imgY = (pdfHeight - scaledHeight) / 2;

    // Add image to PDF
    pdf.addImage(
      imgData,
      'PNG',
      imgX,
      imgY,
      scaledWidth,
      scaledHeight,
      undefined,
      'FAST'
    );

    // Generate filename
    const fileName = resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};