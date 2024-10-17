import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  FontBoldIcon,
  FontItalicIcon,
  ImageIcon,
  Link2Icon,
} from '@radix-ui/react-icons';

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
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-none',
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
      <EditorContent editor={editor} />

      {/* Barre d'outils stylisée avec Tailwind */}
      <div className="flex space-x-2 mt-1">
        <button
          type="button"
          className="bg-gray-400 text-white px-1 py-1 text-sm rounded hover:bg-gray-500 disabled:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
        >
          <FontBoldIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-1 py-1 text-sm rounded hover:bg-gray-500 disabled:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
        >
          <FontItalicIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-1 py-1 text-sm rounded hover:bg-gray-500"
          onClick={setLink}
        >
          <Link2Icon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-1 py-1 text-sm rounded hover:bg-gray-500"
          onClick={addImage}
        >
          <ImageIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Editor;
