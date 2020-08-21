# module.geom / algorithms

## algo.covers.Line_Point

> __assume__ `L ∈ ℝ²` a point and `l ∈ ℝ²` a vector from that point \
> __assume__ `R ∈ ℝ²` another given point 
> 
> __let__ `t := (R - L) / l`__,__ `t ∈ ℝ²` \
> __if__ `t ∈ [0, 1]²` __and__ `t[0] = t[1]` __and__ `R = L + t[0] * l` \
> __then__ `R` lies on the line from `L` in the direction and with the magnitude of `l`
