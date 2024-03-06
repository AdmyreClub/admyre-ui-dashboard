"use client";

import { withProps } from "@udecode/cn";
import {
  createPlugins,
  Plate,
  PlateElement,
  PlateLeaf,
} from "@udecode/plate-common";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import {
  createHeadingPlugin,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
} from "@udecode/plate-heading";
import {
  createListPlugin,
  ELEMENT_UL,
  ELEMENT_OL,
  ELEMENT_LI,
} from "@udecode/plate-list";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT,
} from "@udecode/plate-basic-marks";
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createDndPlugin } from "@udecode/plate-dnd";

import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createDeletePlugin } from "@udecode/plate-select";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createJuicePlugin } from "@udecode/plate-juice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { HeadingElement } from "@/components/plate-ui/heading-element";
import { ListElement } from "@/components/plate-ui/list-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { withDraggables } from "@/components/plate-ui/with-draggables";
import { useState } from "react";
import { Button } from "./ui/button";

const plugins = createPlugins([
  createParagraphPlugin(),
  createHeadingPlugin(),
  createListPlugin(),
  createCaptionPlugin({
    options: {
      pluginKeys: [
        // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
      ],
    },
  }),
  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
  createSubscriptPlugin(),
  createSuperscriptPlugin(),
  createKbdPlugin(),
  createAlignPlugin({
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
        ],
      },
    },
  }),
  createIndentPlugin({
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
        ],
      },
    },
  }),
  createLineHeightPlugin({
    inject: {
      props: {
        defaultNodeValue: 1.5,
        validNodeValues: [1, 1.2, 1.5, 2, 3],
        validTypes: [
          ELEMENT_PARAGRAPH,
          // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
        ],
      },
    },
  }),
  createAutoformatPlugin({
    options: {
      rules: [
        // Usage: https://platejs.org/docs/autoformat
      ],
      enableUndoOnDelete: true,
    },
  }),
  createBlockSelectionPlugin({
    options: {
      sizes: {
        top: 0,
        bottom: 0,
      },
    },
  }),
  createComboboxPlugin(),
  createDndPlugin({
    options: { enableScroller: true },
  }),

  createExitBreakPlugin({
    options: {
      rules: [
        {
          hotkey: "mod+enter",
        },
        {
          hotkey: "mod+shift+enter",
          before: true,
        },
        {
          hotkey: "enter",
          query: {
            start: true,
            end: true,
            // allow: KEYS_HEADING,
          },
          relative: true,
          level: 1,
        },
      ],
    },
  }),
  createNodeIdPlugin(),
  createResetNodePlugin({
    options: {
      rules: [
        // Usage: https://platejs.org/docs/reset-node
      ],
    },
  }),
  createDeletePlugin(),
  createSoftBreakPlugin({
    options: {
      rules: [
        { hotkey: "shift+enter" },
        {
          hotkey: "enter",
          query: {
            allow: [
              // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
            ],
          },
        },
      ],
    },
  }),
  createTabbablePlugin(),
  createTrailingBlockPlugin({
    options: { type: ELEMENT_PARAGRAPH },
  }),
  createDeserializeDocxPlugin(),
  createDeserializeCsvPlugin(),
  createDeserializeMdPlugin(),
  createJuicePlugin(),
]);

const initialValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Description!" }],
  },
];

export function PlateEditor({ sendDataToParent }: any) {
  return (
    <Plate
      plugins={plugins}
      initialValue={initialValue}
      onChange={(newValue) => {
        sendDataToParent(newValue);
      }}
    >
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>

      <Editor className="mt-4 h-[10vh] overflow-y-scroll" />

      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    </Plate>
  );
}
