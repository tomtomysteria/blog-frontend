import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

type EditorProps = {
  content: string;
  onContentChange: (content: string) => void;
};

const Editor: React.FC<EditorProps> = ({ content, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false, // Désactiver l'ouverture automatique des liens sur clic
      }),
      Image,
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500',
      },
    },
    content: content || '', // Contenu initial de l'éditeur
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML()); // Envoyer le contenu mis à jour
    },
    immediatelyRender: false, // Configuration pour éviter les erreurs d'hydratation
  });

  useEffect(() => {
    if (editor && content) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(content, false, {
        preserveWhitespace: 'full',
      }); // Charger le contenu initial si présent
      editor.commands.setTextSelection({ from, to });
    }
  }, [content, editor]);

  const addImage = () => {
    const url = window.prompt("URL de l'image");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL du lien', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  };

  return (
    <div>
      {/* Barre d'outils stylisée avec Tailwind */}
      <div className="flex space-x-2 mb-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
        >
          Gras
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
        >
          Italique
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={setLink}
        >
          Ajouter un lien
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={addImage}
        >
          Ajouter une image
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
