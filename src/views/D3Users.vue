<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import * as d3 from "d3";
import { useFetch } from '@/utils/useFetch.ts';
import type { User } from '@/interfaces/user.ts';

interface Link {
  source: User;
  target: User;
}

const svgRef = ref<SVGSVGElement | null>(null);
const selectedUser = ref<User | null>(null);

const { data: usersData, error } = useFetch<User[]>(`https://jsonplaceholder.typicode.com/users`);

watch(usersData, (users) => {
  if (!users || !svgRef.value) return;

  const svg = d3.select(svgRef.value);
  svg.selectAll("*").remove();

  const width = 800;
  const height = 600;

  const nodes: User[] = users.map(u => ({ ...u }));

  // Create random links or based on city
  const links: Link[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.7 || nodes[i].address.city === nodes[j].address.city) {
        links.push({ source: nodes[i], target: nodes[j] });
      }
    }
  }

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(nodes.map(d => d.company.name));
  const sizeScale = d3.scaleLinear().domain(d3.extent(nodes, d => d.id) as [number, number]).range([8, 20]);

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => sizeScale(d.id) + 5));

  const container = svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background", "#f8f9fa")
      .style("border", "1px solid #dee2e6")
      .style("border-radius", "8px");

  const g = container.append("g");

  const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", event => g.attr("transform", event.transform));

  container.call(zoom);

  const link = g.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1);

  const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer");

  node.append("circle")
      .attr("r", d => sizeScale(d.id))
      .attr("fill", d => colorScale(d.company.name))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

  node.append("text")
      .text(d => d.name)
      .attr("x", 0)
      .attr("y", d => sizeScale(d.id) + 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#333");

  node.append("text")
      .text(d => d.company.name)
      .attr("x", 0)
      .attr("y", d => sizeScale(d.id) + 28)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#666")
      .attr("opacity", 0.7);

  const drag = d3.drag<SVGGElement, User>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

  node.call(drag);

  node.on("click", (event, d) => {
    selectedUser.value = d;
    node.select("circle")
        .attr("stroke", n => n.id === d.id ? "#007bff" : "#fff")
        .attr("stroke-width", n => n.id === d.id ? 4 : 2);
  });

  node.on("mouseover", function(event, d) {
    d3.select(this).select("circle")
        .transition().duration(200)
        .attr("r", sizeScale(d.id) * 1.2);
  }).on("mouseout", function(event, d) {
    d3.select(this).select("circle")
        .transition().duration(200)
        .attr("r", sizeScale(d.id));
  });

  simulation.on("tick", () => {
    link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  onUnmounted(() => simulation.stop());
});
</script>

<template>
  <div>
    <h1>D3.js example</h1>
    <div>
      <svg ref="svgRef"></svg>
    </div>

    <div v-if="selectedUser">
      <h2>Selected User:</h2>
      <p>{{ selectedUser.name }} ({{ selectedUser.email }})</p>
    </div>
  </div>
</template>

<style scoped>
svg {
  width: 100%;
  height: 500px;
}
</style>


