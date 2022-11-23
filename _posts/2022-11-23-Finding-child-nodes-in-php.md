---
---

```php
function get_descendants($nodes, $id){
   $flag = true;
   $child_nodes = [$id];
   while ($flag) {
       $flag = false;
       foreach ($nodes as $key => $node) {
          if (in_array($node['pid'], $child_nodes))  {
              $child_nodes[] = $node['id'];
              unset($nodes[$key]);
              if (!$flag) $flag = true;
          }
       }
   }
   array_shift($child_nodes);
   return  $child_nodes;
}
$nodes = [
    ['id' => 1, 'pid' => 0],
    ['id' => 2, 'pid' => 1],
    ['id' => 3, 'pid' => 1],
    ['id' => 4, 'pid' => 3],
    ['id' => 5, 'pid' => 4],
];
get_descendants($nodes, 3);

```
