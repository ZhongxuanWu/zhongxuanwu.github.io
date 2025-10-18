<h2 id="teaching" style="margin: 20px 0 -10px;">Teaching</h2>

<div class="publications">
<ol class="bibliography">

{% for link in site.data.teaching.teachingassistant %}

<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.image %} 
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
    {% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a>{{ link.title }}</a></div>
    <div class="links">
      {% if link.description %}
      {{ link.description }}
      {% endif %}
    </div>
  </div>
</div>
</li>
<br>

{% endfor %}

</ol>
</div>