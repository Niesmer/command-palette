//This file is a fork of https://github.com/dcooney/react-use-arrows

import {useEffect, useRef} from 'react'

// Default focusable elements.
const defaults = [
   'a[href]:not([disabled])',
   'button:not([disabled])',
   'input',
   'textarea',
   'select',
   'details',
   '[tabindex]:not([tabindex="-1"])'
]

interface useArrowsProps {
   selectors?: string | string[]
   useUpDown?: boolean
   useLeftRight?: boolean
   useTab?: boolean
   loop?: boolean
}

/**
 * Detect and handle arrow presses.
 */
export default function useArrows(
   props: useArrowsProps | null = null
): React.RefObject<HTMLElement> {
   const {
      selectors = defaults,
      useUpDown = true,
      useLeftRight = false,
      useTab = true,
      loop = true
   } = props || {}
   const ref = useRef<HTMLElement>(null)

   useEffect(() => {
      /**
       * Event listener for arrow key presses.
       */
      function arrowHandler(event: KeyboardEvent) {
         const {key} = event
         const activeElement = document ? document.activeElement : null // eslint-disable-line
         const {tagName = ''} = (activeElement as HTMLElement) || {}
         const excludedTags = ['input', 'textarea', 'select']

         const container: HTMLElement | null = ref?.current
         if (!container) {
            return // Exit if no container faound.
         }

         // Get all selector elements.
         const elements = Array.prototype.slice.call(
            container.querySelectorAll(
               selectors.toString()
            ) as NodeListOf<HTMLElement>
         ).filter((element: HTMLElement) => !(element as HTMLInputElement | HTMLButtonElement | HTMLSelectElement | HTMLTextAreaElement).disabled)

         if (!activeElement || !elements?.length) {
            return // Exit if no focusable elements.
         }

         // Set tabindex on all focusable elements.
         elements.forEach((element: HTMLElement) => {
            if (useTab) {
               // Ensure all intended elements are tabbable.
               element.tabIndex = 0
            } else {
               // Remove tab index from focusable elements.
               if (!element.hasAttribute('tabindex')) {
                  element.tabIndex = -1
               }
            }
         })

         // If active element is in the container.
         if (activeElement && container.contains(activeElement)) {
            const first = elements[0]
            const last = elements[elements.length - 1]
            const index = [...elements].indexOf(activeElement)

            /**
             * Prevent focus from jumping if the current focus is not in the element array.
             *
             * This will help prevent focus from jumping to the next focusable element
             * when using keydown event on external DOM element.
             */
            if (elements.indexOf(event?.target) === -1) {
               return
            }

            // Switch focus based on key pressed.
            switch (key) {
               case 'ArrowUp':
                  if (useUpDown) {
                     setFocus(index === 0 && loop ? last : elements[index - 1])
                  }
                  event.preventDefault()
                  break

               case 'ArrowLeft':
                  if (useLeftRight) {
                     setFocus(index === 0 && loop ? last : elements[index - 1])
                  }
                  // Allow arrow key navigation on input fields.
                  if (!excludedTags.includes(tagName?.toLowerCase())) {
                     event.preventDefault()
                  }
                  break

               case 'ArrowDown':
                  if (useUpDown) {
                     setFocus(
                        (index === elements.length - 1 || index === -1) && loop
                           ? first
                           : elements[index + 1]
                     )
                  }
                  event.preventDefault()
                  break

               case 'ArrowRight':
                  if (useLeftRight) {
                     setFocus(
                        (index === elements.length - 1 || index === -1) && loop
                           ? first
                           : elements[index + 1]
                     )
                  }
                  // Allow arrow key navigation on input fields.
                  if (!excludedTags.includes(tagName?.toLowerCase())) {
                     event.preventDefault()
                  }
                  break

               case 'Home':
               case 'PageUp': // Home.
                  setFocus(elements[0])
                  event.preventDefault()
                  break

               case 'End':
               case 'PageDown': // End.
                  setFocus(elements[elements.length - 1])
                  event.preventDefault()
                  break
            }
         }
      }

      // Bind keydown event listener.
      document.addEventListener('keydown', arrowHandler, false)
      return () => {
         // Dispose of event listener on unmount.
         document.removeEventListener('keydown', arrowHandler, false)
      }
   }, []) // eslint-disable-line react-hooks/exhaustive-deps

   return ref
}

/**
 * Set focus on an HTML element.
 */
function setFocus(element: HTMLElement) {
   if (!element) {
      return
   }
   element.focus({
      preventScroll: true
   })
}