function getAdultsLabel(count: number): string {
  return `Max ${count} adult${count > 1 ? 's' : ''}`;
}

export default getAdultsLabel;
