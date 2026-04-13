# The Hot Hand Mystery

If you've ever watched basketball, you've probably heard the phrase "hot hand." It refers to the concept of an "athlete having streaks of success higher than their average performance," but more specific to basketball, it says that if a person made (or missed) their last shot, they are more likely to make (or miss) the next one. The debate around whether or not the hot hand is a real "effect", or just a "fallacy" has been going on for over 40 years.

## Sources and Inspiration

- Thomas Gilovich, Robert Vallone, and Amos Tversky: ["The hot hand in basketball: On the misperception of random sequences."](https://www.joelvelasco.net/teaching/122/Gilo.Vallone.Tversky.pdf)
  -  The original paper coining the phrase "hot hand" that I based my calculations upon
- Joshua Miller and Adam Sanjurjo: ["Surprised by the hot hand fallacy? A truth in the law of small numbers."](https://onlinelibrary.wiley.com/doi/pdf/10.3982/ECTA14943)
  - This paper describes the error within the original GVT study, and how to re-calculate the hot hand effect accordingly
- [Momentum isn’t magic – vindicating the hot hand with the mathematics of streaks (Joshua Miller and Adam Sanjurjo).](https://theconversation.com/momentum-isnt-magic-vindicating-the-hot-hand-with-the-mathematics-of-streaks-74786)
  - An article that explains the bias described in the Miller and Sanjurjo paper in more conversational terms, which I borrowed from in my article
- ESPN API
  - The API behind ESPN's in-game data, which I used to obtain the data I analyzed 


## Built With

- **Jupyter Notebooks (Pandas, NumPy)**
  - I used several Python packages (pandas, numpy, duckdb, requests, scipy, statsmodels, etc.) to scrape, wrangle, and analyze the data. 
- **R**
  - I only used R for one plot, which was the visualization showing the magnitude of the measurement bias for various parameters.
- **TypeScript**
  - I used TypeScript to build the simulation for the measurement bias. 
- **Adobe Illustrator**
  - I used Illustrator to generate most of the images found within the article. The plot built in R was also passed through Illustrator to include special fonts and styling options.
- **LaTeXMathML.js**
  - A helpful library I used to implement LaTeX rendering of math equations used in article.
- **Excel**
  - Miscellaneous data processing and cleaning, as well as formatting each of the tables within the article.
- **HTML, CSS**
  - I used HTML and CSS to make the website, including some interactive elements.

---

#### [Metadata](meta.txt)
