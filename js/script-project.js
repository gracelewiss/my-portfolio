document.addEventListener("DOMContentLoaded", function () {
    const skills = [
      "Python", "JavaScript", "SQL", "React.js", "NodeJS", "MongoDB", "MySQL", "D3.js",
      "HTML", "CSS", "Java", "C++", "Tableau", "Power BI", "Netlify", "VS Code",
      "Azure", "AWS", "PostgreSQL", "ParaView", "PHP", "GitHub"
    ];
  
    const themeColors = ["#64FFDA", "#A8B2D1", "#8892B0", "#CCD6F6"];
  
    const words = skills.map(skill => ({
      text: skill,
      size: 20 + Math.random() * 30,
      color: themeColors[Math.floor(Math.random() * themeColors.length)]
    }));
  
    const width = document.getElementById("word-cloud").offsetWidth;
    const height = 500;
  
    const svg = d3.select("#word-cloud")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    d3.layout.cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90) // 0 or 90 degrees
      .font("Montserrat")
      .fontSize(d => d.size)
      .on("end", draw)
      .start();
  
    function draw(words) {
      svg.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-family", "Montserrat")
        .style("fill", d => d.color)
        .style("font-size", d => `${d.size}px`)
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);
    }
  });
  