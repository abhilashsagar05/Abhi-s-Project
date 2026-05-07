/**
 * Utility to export JSON data to CSV and download it
 */
export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;

  // Get headers from the first object keys
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const val = row[header];
        // Handle strings with commas by wrapping in quotes
        const stringVal = typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
        return stringVal === null || stringVal === undefined ? '' : stringVal;
      }).join(',')
    )
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
