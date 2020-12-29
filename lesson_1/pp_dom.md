## use this page for practice problems" https://d186loudes4jlv.cloudfront.net/fe2/exercises_objects_and_dom/dom_assignment.html

1. Use JavaScript to set a class of 'heading' to the heading (the h1 element).

    - `document.getElementById('primary_heading').setAttribute('class', 'heading');`

2. Use JavaScript to set the class of the ul element to 'bulleted'.

    - `document.getElementById('list').setAttribute('class', 'bulleted');`

3. Add an onclick event to the toggle ID

    ```
    document.getElementById("toggle").onclick = e => {
      e.preventDefault();
      let notice = document.getElementById("notice");
      if (notice.getAttribute("class") === "hidden") {
          notice.setAttribute("class", "visible");
      } else {
        notice.setAttribute("class", "hidden");
      }
    }
    ```

4. Add the onclick even to the element that we're showing and hiding. 

    ```
      document.getElementById("notice").onclick = e => {
        e.preventDefault();
        e.currentTarget.setAttribute("class", "hidden");
      }
    ```

5. Locate the multiplication paragraph and change the text to the result of the arithmetic problem.

  `document.getElementById("multiplication").textContent = String(13 * 9);`

6.  Set the ID of the body element to 'styled' to apply the rest of the styles from the original file. The body tag in this file doesn't have an ID, so you must locate it by some other means.

  `document.body.setAttribute('id', 'styled');`