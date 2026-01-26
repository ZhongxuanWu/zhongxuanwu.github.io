---
page_id: publications
layout: page
permalink: /publications/
title: 文章
description: 
nav: true
nav_order: 2
---

更多信息详见 [<b><font color="#4285F4">G</font><font color="#DB4437">o</font><font color="#F4B400">o</font><font color="#4285F4">g</font><font color="#0F9D58">l</font><font color="#DB4437">e</font> <font color="#4285F4">Scholar</font></b>](https://scholar.google.com/citations?user=mm1AGEkAAAAJ)

<!-- Bibsearch Feature -->
{% include bib_search.liquid %}


<!-- _pages/publications.md -->
## 期刊
<div id="bib-container">
  <div id="bib-compact" class="bib-content">
    <div class="publications">
      {% bibliography --template bib_compact --query @article --sort_by year --order descending %}
    </div>
  </div>
</div>

## 会议
<div id="bib-container">
  <div id="bib-compact" class="bib-content">
    <div class="publications">
      {% bibliography --template bib_compact --query @inproceedings --sort_by year --order descending %}
    </div>
  </div>
</div>
