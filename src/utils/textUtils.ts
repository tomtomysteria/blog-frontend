// Si le contenu HTML ne contient que des balises sans réel contenu, la fonction renvoit '' sinon elle renvoit le contenu intégral
export const cleanHtmlContent = (content: string): string => {
  const strippedContent = content.replace(/<[^>]+>/g, '').trim();
  return strippedContent.length === 0 ? '' : content;
};
