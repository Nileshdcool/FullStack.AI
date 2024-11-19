export default {
    routes: [
      {
        method: 'POST',
        path: '/generate-pdf',
        handler: 'pdf.generatePdf',
        config: {
          auth: false, 
        },
      },
      {
        method: 'POST',
        path: '/download-pdf',
        handler: 'pdf.downloadPdf',
        config: {
          auth: false, 
        },
      },
    ],
  };
  