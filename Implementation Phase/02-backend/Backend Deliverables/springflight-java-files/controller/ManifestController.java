package com.ensf614.springflight.controller;

import com.ensf614.springflight.service.ManifestService;
import com.ensf614.springflight.viewmodels.PassengerView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/manifest")
public class ManifestController {
    private ManifestService manifestService;

    @Autowired
    public ManifestController(ManifestService manifestService) {
        this.manifestService = manifestService;
    }

    @GetMapping("/{code}/{date}")
    public List<PassengerView> getPassengerManifest(@PathVariable String code, @PathVariable String date) {
        return manifestService.getPassengerManifest(code, date);
    }
}
