import React, { useEffect, useRef } from "react";
import { JSONEditor, JSONEditorPropsOptional } from "vanilla-jsoneditor";

const ServiceEditorComponent: React.FC<JSONEditorPropsOptional> = (props) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refEditor = useRef<JSONEditor | null>(null);

  useEffect(() => {
    // create editor
    refEditor.current = new JSONEditor({
      target: refContainer.current!,
      props: {
        ...props,
        content: props?.content,
        mode: "text",
      } as JSONEditorPropsOptional,
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // update props
    if (refEditor.current) {
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div ref={refContainer}></div>;
};

export default ServiceEditorComponent;
