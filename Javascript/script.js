document.addEventListener("DOMContentLoaded", () => {
  const contentHeaders = document.querySelectorAll("#contentHeader button"); // Select all buttons inside #contentHeader
  const menuItems = document.querySelectorAll(".menu-item");
  const submenuItems = document.querySelectorAll(".submenu-item");
  const sections = document.querySelectorAll(".content-section");
  let currentSectionIndex = 0;

  const defaultContentId = "most-popular"; 
  showContent(defaultContentId);

  // Handle menu item clicks
  menuItems.forEach(item => {
      item.addEventListener("click", () => {
          const submenu = item.querySelector(".submenu");
          const arrowDown = item.querySelector(".arrow-down");
          const arrowUp = item.querySelector(".arrow-up");
          const isOpen = submenu && submenu.classList.contains("open");

          // Close all other submenus
          document.querySelectorAll(".submenu").forEach(sub => sub.classList.remove("open"));
          document.querySelectorAll(".arrow-down").forEach(icon => icon.classList.remove("rotate"));
          document.querySelectorAll(".arrow-up").forEach(icon => icon.classList.remove("rotate"));

          if (submenu) {
              submenu.classList.toggle("open", !isOpen); 
              if (arrowDown) arrowDown.classList.toggle("rotate", !isOpen); 
              if (arrowUp) arrowUp.classList.toggle("rotate", isOpen);
          }

          // Show content or update active state
          if (!submenu) {
              const contentId = item.getAttribute("data-content");
              showContent(contentId);
              updateActiveState(item, false); 
          } else {
              updateActiveState(item, true); 
          }
      });
  });

  // Handle submenu item clicks
  submenuItems.forEach(subItem => {
      subItem.addEventListener("click", function (e) {
          e.stopPropagation();  
          const contentId = subItem.getAttribute("data-content");
          showContent(contentId);
          updateActiveState(subItem, false); 
      });
  });

  contentHeaders.forEach(btn => {
      btn.addEventListener("click", function (e) {
          e.stopPropagation(); // Prevent event bubbling

          const contentId = btn.getAttribute("data-content");
          showContent(contentId); // Display relevant content
          
          updateActiveStateContent(btn);
      });
   });

  // Function to show content
  function showContent(contentId) {
      const activeContent = document.querySelector(".content-section.active");
      if (activeContent) {
          activeContent.classList.remove("active");
      }

      const contentSection = document.getElementById(contentId);
      if (contentSection) {
          contentSection.classList.add("active");
      }

      // Update the current section index based on active content
      currentSectionIndex = Array.from(sections).indexOf(contentSection);
      updateNavigation();
  }

  // Function to update active state
  function updateActiveState(activeItem, isSubmenuParent) {
    document.querySelectorAll(".menu-item, .submenu-item, #contentHeader button").forEach(item => {
        item.classList.remove("active");
    });

    if (!isSubmenuParent) {
        activeItem.classList.add("active");
    }

    const firstContentHeaderButton = document.querySelector("#contentHeader button:first-child");
    if (firstContentHeaderButton) {
        firstContentHeaderButton.classList.add("active");
    }
  }

  // Function to update active state for content headers
  function updateActiveStateContent(activeItem) {
    document.querySelectorAll("#contentHeader button").forEach(item => {
        item.classList.remove("active");
    });

    activeItem.classList.add("active");
  }

  // Update navigation buttons
  function updateNavigation() {
      const previousButton = document.querySelector(".nav-previous");
      const nextButton = document.querySelector(".nav-next");

      if (currentSectionIndex > 0) {
          const prevSection = sections[currentSectionIndex - 1];
          previousButton.setAttribute("data-target", prevSection.id);
      } else {
          previousButton.setAttribute("data-target", "");
      }

      if (currentSectionIndex < sections.length - 1) {
          const nextSection = sections[currentSectionIndex + 1];
          nextButton.setAttribute("data-target", nextSection.id);
      } else {
          nextButton.setAttribute("data-target", "");
      }
  }

  // Handle "Previous" button click
  document.querySelector(".nav-previous").addEventListener("click", () => {
      const targetId = document.querySelector(".nav-previous").getAttribute("data-target");
      if (targetId) {
          showContent(targetId);
      }
  });

  // Handle "Next" button click
  document.querySelector(".nav-next").addEventListener("click", () => {
      const targetId = document.querySelector(".nav-next").getAttribute("data-target");
      if (targetId) {
          showContent(targetId);
      }
  });
});


let acc = document.getElementsByClassName("faqs");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("faq-active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/blogs')
      .then(response => response.json())
      .then(blogs => {
        // Filter for "popular" category, sort by date, and take the first 6
        const popularBlogs = blogs
          .filter(blog => blog.category === 'popular')
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
  
        // Filter for "recommended" category, sort by date, and take the first 3
        const recommendedBlogs = blogs
          .filter(blog => blog.category === 'recommended')
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
  
        const mostPopularBlogsSection = document.querySelector('#getting-started #most-popular .cards');
  
        // Loop through the filtered popular blogs and append them to the most-popular section
        popularBlogs.forEach(blog => {
          const blogElement = document.createElement('div');
          blogElement.innerHTML = `
            <img src="${blog.imageUrl || '/path/to/default/image.png'}" alt="${blog.title}">
            <span>${blog.title}</span>
          `;
          mostPopularBlogsSection.appendChild(blogElement);
        });
  
        const recommendedBlogsSection = document.querySelector('#getting-started #articles .row');
  
        // Loop through the filtered recommended blogs and append them to the recommended articles section
        recommendedBlogs.forEach(blog => {
          const blogElement = document.createElement('div');
          blogElement.classList.add('card');
          blogElement.innerHTML = `
            <img src="${blog.imageUrl || '/Assets/Help Center/office-room.jpg'}" alt="office room">
            <div>
              <h3>${blog.title}</h3>
              <div>
                <span>${blog.content.substring(0, 50)}...</span>
                <img src="/Assets/Help Center/arrow-tr.png" alt="arrow top right">
              </div>
            </div>
          `;
          recommendedBlogsSection.appendChild(blogElement);
        });
  
        // Filter for "getting started" category, sort by date, and take the first 4
        const gettingStartedBlogs = blogs
          .filter(blog => blog.category === 'getting started')
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);
  
        const blogSections = [
          document.querySelector('#create-account .main-content'),
          document.querySelector('#add-billing .main-content'),
          document.querySelector('#verify-billing .main-content'),
          document.querySelector('#run-campaign .main-content')
        ];
  
        // Loop through the filtered "getting started" blogs and populate each section
        gettingStartedBlogs.forEach((blog, index) => {
            const blogSection = blogSections[index];
          
            if (blogSection) {
              blogSection.querySelector('img').src = blog.imageUrl || '../Assets/Help Center/image-Placeholder.png';
              blogSection.querySelector('img').alt = blog.title;
              blogSection.querySelector('h3').textContent = blog.title;
              blogSection.querySelector('p').textContent = blog.content.substring(0, 150) + '...'; // Preview of the content
              
              // Update the title-name in each section based on the index
              const titleElement = document.querySelector(`#create-account .title-name`);
              if(index === 0) titleElement.textContent = blog.title || 'option 1';
              
              const titleElement1 = document.querySelector('#add-billing .title-name');
              if(index === 1) titleElement1.textContent = blog.title || 'option 2';
              
              const titleElement2 = document.querySelector('#verify-billing .title-name');
              if(index === 2) titleElement2.textContent = blog.title || 'option 3';
              
              const titleElement3 = document.querySelector('#run-campaign .title-name');
              if(index === 3) titleElement3.textContent = blog.title || 'option 4';
            }
          });
          
        // Filter for "helpful" category, sort by date, and take the first 3
        const helpfulBlogs = blogs
          .filter(blog => blog.category === 'helpful')
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
  
        const helpfulBlogsSections = [
          document.querySelector('#helpful1 .main-content'),
          document.querySelector('#helpful2 .main-content'),
          document.querySelector('#helpful3 .main-content')
        ];
  
        // Loop through the filtered helpful blogs and append them to the helpful sections
        helpfulBlogs.forEach((blog, index) => {
          const blogElement = document.createElement('div');
          blogElement.classList.add('card');
          blogElement.innerHTML = `
            <img src="${blog.imageUrl || '../Assets/Help Center/image-Placeholder.png'}" alt="${blog.title}">
            <div>
              <h3>${blog.title}</h3>
              <p>${blog.content.substring(0, 150)}...</p>
            </div>
          `;
          
          if (helpfulBlogsSections[index]) {
            helpfulBlogsSections[index].appendChild(blogElement);
            document.querySelector(`.submenu-item[data-content="helpful${index + 1}"]`).textContent = blog.title || `option ${index + 1}`;
            document.querySelector(`#helpful${index + 1} .title-name`).innerHTML = blog.title || `option ${index + 1}`;
          }
        });
      })
      .catch(error => console.error('Error fetching blogs:', error));
  });
  