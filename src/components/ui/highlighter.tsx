"use client"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { useLayoutEffect, useRef } from "react"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = false,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "0px",
  })

  const shouldShow = isView ? isInView : isInView;

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let initTimeout: ReturnType<typeof setTimeout> | null = null

    if (shouldShow && element) {
      initTimeout = setTimeout(() => {
        if (!element) return

        const annotationConfig = {
          type: action,
          color,
          strokeWidth,
          animationDuration,
          iterations,
          padding,
          multiline,
        }

        const currentAnnotation = annotate(element, annotationConfig)
        annotation = currentAnnotation
        currentAnnotation.show()

        let timeoutId: ReturnType<typeof setTimeout>
        let lastWidth = element.offsetWidth
        let lastHeight = element.offsetHeight

        const refreshAnnotation = () => {
          if (!element || !annotation) return
          annotation.hide()
          annotation.show()
        }

        resizeObserver = new ResizeObserver(() => {
          if (!element) return

          const newWidth = element.offsetWidth
          const newHeight = element.offsetHeight

          if (Math.abs(newWidth - lastWidth) > 2 || Math.abs(newHeight - lastHeight) > 2) {
            lastWidth = newWidth
            lastHeight = newHeight

            clearTimeout(timeoutId)
            timeoutId = setTimeout(refreshAnnotation, 150)
          }
        })

        resizeObserver.observe(element)
        window.addEventListener("resize", refreshAnnotation)

        if (document.fonts) {
          document.fonts.ready.then(() => {
            if (element) {
              lastWidth = element.offsetWidth
              lastHeight = element.offsetHeight
              refreshAnnotation()
            }
          })
        }
      }, 300)
    }

    return () => {
      if (initTimeout) clearTimeout(initTimeout)
      annotation?.remove()
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span ref={elementRef} className="inline-block relative">
      {children}
    </span>
  )
}
